
import React from 'react';
import { LearningMaterial } from '../types';

interface LearningPathProps {
  materials: LearningMaterial[];
  onMaterialClick: (material: LearningMaterial) => void;
  onTakeQuiz: (topicId: string, index: number) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ materials, onMaterialClick, onTakeQuiz }) => {
  const basic = materials.filter(m => m.level === 'Basic');
  const foundational = materials.filter(m => m.level === 'Foundational');
  const advanced = materials.filter(m => m.level === 'Advanced');

  const renderCard = (m: LearningMaterial, isFullWidth = false) => (
    <div 
      key={m.id}
      className={`
        p-6 rounded-[28px] border-2 transition-all relative group flex flex-col
        ${m.locked 
          ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
          : 'bg-white border-white shadow-sm hover:border-indigo-100 hover:shadow-md'
        }
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 ${
          m.locked ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {m.type === 'Article' ? <i className="fa-regular fa-file-lines"></i> : 
           m.type === 'Video' ? <i className="fa-regular fa-circle-play"></i> : 
           <i className="fa-solid fa-keyboard"></i>}
        </div>
        {!m.locked && (
          <div className="text-right">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Topic Progress</div>
            <div className="flex items-center justify-end gap-1">
              {[0, 1].map((idx) => {
                const isCompleted = m.completedAssessments.includes(idx);
                const score = m.assessmentScores?.[idx];
                let colorClass = 'bg-slate-100';
                
                if (isCompleted && score !== undefined) {
                  if (score < 50) colorClass = 'bg-red-400';
                  else if (score <= 70) colorClass = 'bg-amber-400';
                  else colorClass = 'bg-green-400';
                }

                return (
                  <div key={idx} className={`h-1.5 w-8 rounded-full ${colorClass}`}></div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 mb-6">
        <h4 className="font-black text-xl text-slate-800 leading-tight mb-3 group-hover:text-indigo-600 transition-colors">{m.title}</h4>
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border ${
          m.level === 'Foundational' ? 'bg-green-50 border-green-100 text-green-700' : 
          m.level === 'Basic' ? 'bg-blue-50 border-blue-100 text-blue-700' :
          'bg-purple-50 border-purple-100 text-purple-700'
        }`}>
          {m.level}
        </span>
      </div>

      {m.locked ? (
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase italic justify-center">
          <i className="fa-solid fa-lock"></i>
          Locked - Pass Previous
        </div>
      ) : (
        <div className="mt-auto space-y-3">
          <button 
            onClick={() => onMaterialClick(m)}
            className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 whitespace-nowrap"
          >
            <i className="fa-solid fa-book-open"></i>
            Notes
          </button>

          <div className="flex gap-2 w-full">
            {[0, 1].map(idx => {
              const score = m.assessmentScores?.[idx];
              const isCompleted = m.completedAssessments.includes(idx);
              
              let buttonStyle = 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600';
              if (isCompleted) {
                  if (score !== undefined) {
                      if (score < 50) buttonStyle = 'bg-red-50 text-red-700 border-red-100';
                      else if (score <= 70) buttonStyle = 'bg-amber-50 text-amber-700 border-amber-100';
                      else buttonStyle = 'bg-green-50 text-green-700 border-green-100';
                  } else {
                      buttonStyle = 'bg-green-50 text-green-700 border-green-100';
                  }
              }

              return (
                <button
                  key={idx}
                  onClick={() => onTakeQuiz(m.id, idx)}
                  className={`flex-1 px-2 py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-2 border whitespace-nowrap overflow-hidden ${buttonStyle}`}
                >
                  <span className="truncate">Quiz {idx + 1}</span>
                  {isCompleted && score !== undefined ? (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] shrink-0 ${
                      score < 50 ? 'bg-red-200 text-red-800' :
                      score <= 70 ? 'bg-amber-200 text-amber-800' :
                      'bg-green-200 text-green-800'
                    }`}>{score}%</span>
                  ) : (
                    <i className={`fa-solid ${isCompleted ? 'fa-check' : 'fa-play'} shrink-0`}></i>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-10">
      {basic.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Basic Skills Module</h3>
          <div className="grid grid-cols-1 gap-5">
            {basic.map(m => renderCard(m, true))}
          </div>
        </div>
      )}

      {foundational.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Foundational Core</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {foundational.map(m => renderCard(m))}
          </div>
        </div>
      )}

      {advanced.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Advanced Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {advanced.map(m => renderCard(m))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;
