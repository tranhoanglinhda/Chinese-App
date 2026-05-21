/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import TheorySection from './components/TheorySection';
import PracticeRoom from './components/PracticeRoom';
import TopicList from './components/TopicList';
import FeedbackModal from './components/FeedbackModal';
import { GraduationCap, MessageSquare } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Topic } from './types';

type Mode = 'list' | 'theory' | 'practice';

export default function App() {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [mode, setMode] = useState<Mode>('list');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSelectTopic = (topic: Topic) => {
    setCurrentTopic(topic);
    setMode('theory');
  };

  const handleBackToList = () => {
    setCurrentTopic(null);
    setMode('list');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBackToList}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800 leading-none">Ngữ pháp tiếng Trung</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-orange-500 mt-1">ĐHNN-ĐHĐN</p>
            </div>
          </div>

          {currentTopic && (
            <nav className="flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setMode('theory')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all",
                  mode === 'theory' 
                    ? "bg-white text-orange-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                )}
              >
                Lý thuyết
              </button>
              <button
                onClick={() => setMode('practice')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all",
                  mode === 'practice' 
                    ? "bg-white text-orange-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                )}
              >
                Luyện tập
              </button>
            </nav>
          )}

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all uppercase tracking-widest"
            >
              <MessageSquare size={14} /> Góp ý
            </button>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hệ thống Ngữ pháp 2.0</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          {mode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TopicList onSelect={handleSelectTopic} />
            </motion.div>
          )}

          {mode === 'theory' && currentTopic && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TheorySection 
                topic={currentTopic} 
                onBack={handleBackToList} 
                onStartPractice={() => setMode('practice')}
              />
            </motion.div>
          )}

          {mode === 'practice' && currentTopic && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PracticeRoom topic={currentTopic} onBack={() => setMode('theory')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        context={mode === 'list' ? 'Trang chủ' : `${currentTopic?.title} (${mode === 'theory' ? 'Lý thuyết' : 'Luyện tập'})`}
      />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">Ngữ pháp tiếng Trung ĐHNN-ĐHĐN</p>
          <p className="text-slate-300 text-[10px] mt-1 italic italic-small tracking-wider">Học liệu điện tử hỗ trợ sinh viên chuyên ngành tiếng Trung.</p>
        </div>
      </footer>
    </div>
  );
}

