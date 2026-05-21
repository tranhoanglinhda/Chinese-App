import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { WordItem, Topic } from '../types';
import FeedbackModal from './FeedbackModal';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

interface PracticeRoomProps {
  topic: Topic;
  onBack: () => void;
}

export default function PracticeRoom({ topic, onBack }: PracticeRoomProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pool, setPool] = useState<WordItem[]>([]);
  const [answer, setAnswer] = useState<WordItem[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${topic.id}`);
    if (savedProgress) {
      try {
        const { completed, failed } = JSON.parse(savedProgress);
        const completedSet = new Set(completed as number[]);
        setCompletedIndices(completedSet);
        setFailedIndices(new Set(failed as number[]));
        
        // Find first question not yet completed
        const firstUncompleted = topic.questions.findIndex((_, idx) => !completedSet.has(idx));
        if (firstUncompleted !== -1) {
          setCurrentIdx(firstUncompleted);
        }
      } catch (e) {
        console.error("Failed to load progress:", e);
      }
    } else {
      setCompletedIndices(new Set());
      setFailedIndices(new Set());
      setCurrentIdx(0);
    }
  }, [topic.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (completedIndices.size > 0 || failedIndices.size > 0) {
      localStorage.setItem(`progress_${topic.id}`, JSON.stringify({
        completed: Array.from(completedIndices),
        failed: Array.from(failedIndices)
      }));
    }
  }, [completedIndices, failedIndices, topic.id]);

  const currentQuestion = topic.questions[currentIdx];

  // Initialize pool and answer
  useEffect(() => {
    if (currentQuestion) {
      const shuffled = [...currentQuestion.scrambled].sort(() => Math.random() - 0.5);
      setPool(shuffled);
      setAnswer([]);
      setIsCorrect(null);
      setAiHint(null);
      setShowResultModal(false);
      setShowExplanation(false);

      // Scroll active question button into view
      const activeBtn = document.getElementById(`q-nav-${currentIdx}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIdx, topic.id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResultModal) return; // Disable shortcuts when modal is open

      if (e.key === 'Enter') {
        if (isCorrect === true) {
          handleNext();
        } else if (answer.length > 0) {
          handleCheck();
        }
      } else if (e.key === 'ArrowRight' && isCorrect === true) {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answer, isCorrect, currentIdx, showResultModal]);

  const handleAddToAnswer = (item: WordItem) => {
    if (isCorrect === true) return;
    setPool(prev => prev.filter(i => i.id !== item.id));
    setAnswer(prev => [...prev, item]);
    setIsCorrect(null);
  };

  const handleRemoveFromAnswer = (item: WordItem) => {
    if (isCorrect === true) return;
    setAnswer(prev => prev.filter(i => i.id !== item.id));
    setPool(prev => [...prev, item]);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (answer.length === 0) return;
    
    const currentOrderIds = answer.map(i => i.id);
    const primaryMatch = currentOrderIds.join(',') === currentQuestion.correctIds.join(',');
    const alternativeMatch = currentQuestion.alternativeCorrectIds?.some(
      alt => currentOrderIds.join(',') === alt.join(',')
    );
    
    const correct = primaryMatch || alternativeMatch;
    setIsCorrect(correct);
    setShowResultModal(true);

    if (correct) {
      setCompletedIndices(prev => new Set(prev).add(currentIdx));
      setFailedIndices(prev => {
        const next = new Set(prev);
        next.delete(currentIdx);
        return next;
      });
    } else {
      if (!completedIndices.has(currentIdx)) {
        setFailedIndices(prev => new Set(prev).add(currentIdx));
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < topic.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleReset = () => {
    const shuffled = [...currentQuestion.scrambled].sort(() => Math.random() - 0.5);
    setPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
    setAiHint(null);
    setShowResultModal(false);
    setShowExplanation(false);
  };

  const getAiHint = async () => {
    setIsLoadingHint(true);
    setAiHint(null);
    try {
      const correctText = currentQuestion.correctIds.map(id => 
        currentQuestion.scrambled.find(s => s.id === id)?.text
      ).join(' ');

      const prompt = `Câu hỏi: Xếp các từ sau thành câu đúng: ${currentQuestion.scrambled.map(s => s.text).join(', ')}.
      Câu trả lời đúng là: ${correctText} (${currentQuestion.translation}).
      Người dùng đang chọn: ${answer.map(a => a.text).join(' ')}.
      Hãy giải thích ngắn gọn tại sao thứ tự này chưa đúng và gợi ý cách sửa dựa trên ngữ pháp Hán ngữ. Trả lời bằng tiếng Việt.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setAiHint(data.reply);
    } catch (error) {
      console.error(error);
      setAiHint("Không thể kết nối với AI lúc này.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-orange-50 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            title="Quay lại"
          >
            <Icons.ArrowLeft size={20} />
          </button>
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{topic.title}</span>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">Luyện tập sắp xếp</h2>
              <button
                onClick={() => setShowTheoryModal(true)}
                className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md text-[10px] font-bold hover:bg-orange-100 transition-colors border border-orange-100 uppercase tracking-wider"
              >
                <Icons.BookOpen size={12} />
                Lý thuyết
              </button>
              {(completedIndices.size > 0 || failedIndices.size > 0) && (
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến trình của chủ đề này không?')) {
                      setCompletedIndices(new Set());
                      setFailedIndices(new Set());
                      localStorage.removeItem(`progress_${topic.id}`);
                      setCurrentIdx(0);
                    }
                  }}
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[10px] font-bold hover:bg-red-50 hover:text-red-500 transition-colors border border-slate-100 uppercase tracking-wider"
                >
                  <Icons.Trash2 size={12} />
                  Xóa tiến trình
                </button>
              )}
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-500 rounded-md text-[10px] font-bold hover:bg-blue-100 transition-colors border border-blue-100 uppercase tracking-wider"
              >
                <Icons.MessageSquare size={12} />
                Góp ý
              </button>
            </div>
          </div>
        </div>

        {/* Question Selector Dots/List */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-2 w-full md:w-auto no-scrollbar">
          {topic.questions.map((_, idx) => (
            <button
              key={idx}
              id={`q-nav-${idx}`}
              onClick={() => setCurrentIdx(idx)}
              className={cn(
                "w-9 h-9 rounded-full text-sm font-bold transition-all flex items-center justify-center shrink-0 border-2",
                currentIdx === idx 
                  ? "bg-orange-600 text-white border-orange-600 scale-110 shadow-lg z-10" 
                  : completedIndices.has(idx)
                    ? "bg-green-500 text-white border-green-500 opacity-90"
                    : failedIndices.has(idx)
                      ? "bg-red-500 text-white border-red-500 opacity-90"
                      : "bg-white text-slate-400 border-slate-100 hover:border-orange-200 hover:text-orange-400"
              )}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative">
        <div className="space-y-6">
          {/* Answer Area */}
          <div className="bg-white min-h-[120px] p-8 rounded-3xl border-2 border-orange-100 shadow-inner flex flex-wrap justify-center gap-3 items-center relative overflow-hidden">
             {/* Hint background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-8xl font-black">{currentIdx + 1}</span>
            </div>

            <AnimatePresence mode="popLayout">
              {answer.length === 0 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-300 italic z-10"
                >
                  Nhấn vào các từ bên dưới để trả lời...
                </motion.p>
              )}
              {answer.map((item) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  onClick={() => handleRemoveFromAnswer(item)}
                  className="px-6 py-4 bg-orange-50 border-2 border-orange-200 rounded-2xl text-2xl font-medium text-orange-800 hover:bg-orange-100 transition-colors shadow-sm z-10"
                >
                  {item.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Word Pool Area */}
          <div className="p-8 rounded-3xl bg-slate-50/80 border-2 border-dashed border-slate-200 flex flex-wrap justify-center gap-3">
            <AnimatePresence mode="popLayout">
              {pool.map((item) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  onClick={() => handleAddToAnswer(item)}
                  className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm text-2xl font-medium text-slate-700 hover:border-orange-400 hover:shadow-lg transition-all active:scale-95"
                >
                  {item.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 mb-2">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <Icons.ChevronLeft size={18} /> Trước
          </button>
          <button
            onClick={handleCheck}
            disabled={answer.length === 0 || isCorrect === true}
            className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all transform hover:scale-105 disabled:bg-slate-300 disabled:shadow-none disabled:scale-100"
          >
            Kiểm tra đáp án
          </button>
          <button
            onClick={handleNext}
            disabled={currentIdx === topic.questions.length - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            Sau <Icons.ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Result Modal Popup */}
      <AnimatePresence>
        {showResultModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResultModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className={cn(
                "p-8 text-center space-y-3 shrink-0",
                isCorrect ? "bg-green-50" : "bg-red-50"
              )}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className={cn(
                    "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg transform rotate-3",
                    isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}
                >
                  {isCorrect ? <Icons.Check size={32} /> : <Icons.X size={32} />}
                </motion.div>
                
                <h3 className={cn(
                  "text-2xl font-black uppercase tracking-tight",
                  isCorrect ? "text-green-600" : "text-red-600"
                )}>
                  {isCorrect ? "Tuyệt vời!" : "Chưa đúng rồi"}
                </h3>
              </div>

              <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                {!isCorrect && !aiHint && (
                  <p className="text-red-400 font-medium text-center">Đừng nản lòng, hãy thử lại hoặc xem gợi ý nhé!</p>
                )}

                {isCorrect && showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nghĩa là</span>
                      <p className="text-lg text-slate-800 font-semibold">{currentQuestion.translation}</p>
                    </div>
                    <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
                      <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-1">Quy tắc ngữ pháp</span>
                      <p className="text-slate-700 text-base leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </motion.div>
                )}

                {aiHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 p-6 rounded-2xl border border-blue-100"
                  >
                    <div className="flex items-center gap-2 text-blue-700 font-bold mb-3">
                      <Icons.GraduationCap size={22} />
                      <span className="text-lg">Giáo viên AI</span>
                    </div>
                    <div className="text-blue-900 text-base leading-relaxed prose prose-base prose-blue max-w-none">
                      <ReactMarkdown>{aiHint}</ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
                <div className="flex flex-col gap-3">
                  {isCorrect ? (
                    <>
                      {!showExplanation && (
                        <button
                          onClick={() => setShowExplanation(true)}
                          className="w-full py-4 px-6 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                          <Icons.Info size={20} /> Giải thích chi tiết
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        className="w-full py-4 px-6 bg-green-600 text-white rounded-2xl font-bold shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        Câu tiếp theo <Icons.ChevronRight size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setShowResultModal(false);
                            setShowTheoryModal(true);
                          }}
                          className="py-4 px-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm flex flex-col items-center gap-2"
                        >
                          <Icons.BookOpen size={20} /> Lý thuyết
                        </button>
                        <button
                          onClick={getAiHint}
                          disabled={isLoadingHint}
                          className="py-4 px-4 bg-orange-50 text-orange-600 border-2 border-orange-100 rounded-2xl font-bold hover:bg-orange-100 transition-all text-sm flex flex-col items-center gap-2 disabled:opacity-50"
                        >
                          {isLoadingHint ? <Icons.Loader2 size={20} className="animate-spin" /> : <Icons.Sparkles size={20} />}
                          Hỏi giáo viên AI
                        </button>
                      </div>
                      <button
                        onClick={handleReset}
                        className="w-full py-4 px-6 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
                      >
                        Thử lại ngay
                      </button>
                    </>
                  )}
                  
                  <button 
                    onClick={() => setShowResultModal(false)}
                    className="text-slate-400 text-xs font-medium hover:text-slate-600 py-1 text-center"
                  >
                    Đóng lại
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Theory Modal Popup */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        context={`Chủ đề: ${topic.title} - Câu hỏi #${currentIdx + 1}: ${currentQuestion?.translation}`}
      />
      
      <AnimatePresence>
        {showTheoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTheoryModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <Icons.BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Sổ tay lý thuyết</h3>
                </div>
                <button 
                  onClick={() => setShowTheoryModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <Icons.X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="prose prose-orange prose-sm md:prose-base prose-h1:text-orange-600 prose-h3:text-orange-500 max-w-none">
                  <ReactMarkdown>{topic.theory}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                <button
                  onClick={() => setShowTheoryModal(false)}
                  className="px-8 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100"
                >
                  Tiếp tục luyện tập
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

