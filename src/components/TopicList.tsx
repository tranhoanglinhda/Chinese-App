import React from 'react';
import { Topic } from '../types';
import { topics } from '../data/topics';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

interface TopicListProps {
  onSelect: (topic: Topic) => void;
}

export default function TopicList({ onSelect }: TopicListProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Chọn chủ đề ngữ pháp</h2>
        <p className="text-slate-500">Khám phá và luyện tập các quy tắc ngữ pháp tiếng Trung từ cơ bản đến nâng cao.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          // Dynamic icon selection (hacky but works for this scope)
          const IconComponent = (Icons as any)[topic.icon] || Icons.Book;
          const isComingSoon = topic.questions.length === 0;

          // Calculate progress if not coming soon
          let progress = 0;
          if (!isComingSoon) {
            const savedProgress = localStorage.getItem(`progress_${topic.id}`);
            if (savedProgress) {
              try {
                const { completed } = JSON.parse(savedProgress);
                progress = Math.round((completed.length / topic.questions.length) * 100);
              } catch (e) {
                console.error("Failed to parse progress", e);
              }
            }
          }

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isComingSoon ? { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" } : {}}
              onClick={() => !isComingSoon && onSelect(topic)}
              className={cn(
                "group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all relative overflow-hidden",
                !isComingSoon ? "cursor-pointer hover:border-orange-200" : "opacity-75 grayscale bg-slate-50"
              )}
            >
              {isComingSoon && (
                <div className="absolute top-3 right-3 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Sắp ra mắt
                </div>
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                !isComingSoon ? "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white" : "bg-slate-200 text-slate-400"
              )}>
                <IconComponent size={24} />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{topic.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{topic.description}</p>
              
              {!isComingSoon && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Tiến độ</span>
                    <span className={cn(progress === 100 ? "text-green-500" : "text-orange-500")}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className={cn(
                        "h-full transition-all duration-1000",
                        progress === 100 ? "bg-green-500" : "bg-orange-500"
                      )}
                    />
                  </div>
                  <div className="pt-2 flex items-center text-orange-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {progress === 100 ? "Luyện tập lại" : "Bắt đầu luyện tập"} <Icons.ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
