import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Topic } from '../types';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface TheorySectionProps {
  topic: Topic;
  onBack: () => void;
  onStartPractice: () => void;
}

export default function TheorySection({ topic, onBack, onStartPractice }: TheorySectionProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>
      
      <div className="p-8 bg-white rounded-3xl shadow-sm border border-orange-100">
        <div className="prose prose-orange lg:prose-lg max-w-none prose-h1:text-orange-600 prose-h3:text-orange-500">
          <ReactMarkdown>{topic.theory}</ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-orange-50 flex justify-center">
          <button
            onClick={onStartPractice}
            className="group flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all transform hover:scale-105"
          >
            Luyện tập ngay
            <div className="bg-orange-500 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
              <BookOpen size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
