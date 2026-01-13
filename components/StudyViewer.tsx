
import React from 'react';
import { LearningMaterial } from '../types';

interface StudyViewerProps {
  material: LearningMaterial;
  onClose: () => void;
  onStartQuiz: (index: number) => void;
}

const StudyViewer: React.FC<StudyViewerProps> = ({ material, onClose, onStartQuiz }) => {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full min-h-[550px]">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/40 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          
          <div className="h-6 w-px bg-slate-200 shrink-0"></div>
          
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Study Mode</span>
            <h3 className="font-bold text-slate-800 text-lg leading-none">{material.title}</h3>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${
            material.level === 'Foundational' ? 'bg-green-50 border-green-100 text-green-700' : 
            material.level === 'Basic' ? 'bg-blue-50 border-blue-100 text-blue-700' :
            'bg-purple-50 border-purple-100 text-purple-700'
          }`}>
            {material.level}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-2xl mx-auto">
          <div className="prose prose-slate max-w-none 
            prose-headings:font-black prose-headings:text-slate-800 prose-headings:mt-8 prose-headings:mb-4 
            prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-6 
            prose-li:text-slate-600 prose-li:leading-relaxed prose-li:mb-2
            prose-strong:text-indigo-600 
            prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <div dangerouslySetInnerHTML={{ __html: material.content || "<p>No content available.</p>" }} />
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            <i className="fa-solid fa-circle-info mr-2 text-indigo-400"></i>
            Feeling confident? Test your knowledge below.
          </p>
          <div className="flex gap-3 w-full sm:w-auto min-w-[300px]">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => onStartQuiz(idx)}
                className={`flex-1 px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  material.completedAssessments.includes(idx)
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                }`}
              >
                <span>Assessment {idx + 1}</span>
                {material.completedAssessments.includes(idx) ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyViewer;
