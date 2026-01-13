
import React, { useState } from 'react';
import { LearningState, LogEntry } from '../types';

interface AgentDashboardProps {
  state: LearningState;
  logs: LogEntry[];
  proximity: number;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ state, logs, proximity }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col sticky top-24 transition-all duration-300 ease-in-out ${isExpanded ? 'h-[calc(100vh-200px)]' : 'h-auto'}`}>
      <div 
        className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-black text-slate-800 flex items-center gap-3 select-none">
          <i className="fa-solid fa-satellite-dish text-indigo-500"></i>
          System Intelligence
        </h3>
        <button 
          className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
          aria-label={isExpanded ? "Collapse dashboard" : "Expand dashboard"}
        >
          <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} transition-transform duration-300`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
          {/* State Vector Visualization */}
          <div className="p-6 grid grid-cols-2 gap-3 border-b border-slate-50 bg-slate-50/20 shrink-0">
            {Object.entries(state).map(([key, value]) => (
              <div key={key} className="p-3 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</span>
                <span className={`text-xs font-black truncate ${
                  value === 'High' || value === 'Completed' || value === 'Improved' || value === 'Responded' 
                  ? 'text-green-600' : value === 'Low' || value === 'No_Score' ? 'text-slate-400' : 'text-amber-500'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Decision Trace Log */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10 w-full border-b border-transparent">
              <i className="fa-solid fa-code-branch text-amber-500"></i>
              Live Reasoning Trace
            </h4>
            {logs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30 italic text-sm text-center min-h-[100px]">
                System standby. <br/>Awaiting user signals...
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="flex gap-4 group animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 border-2 border-white shadow-sm ${
                    log.type === 'SENSOR' ? 'bg-blue-400' : 
                    log.type === 'REASONING' ? 'bg-amber-400' : 'bg-indigo-400'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${
                        log.type === 'SENSOR' ? 'text-blue-500' : 
                        log.type === 'REASONING' ? 'text-amber-500' : 'text-indigo-500'
                      }`}>{log.type}</span>
                      <span className="text-[10px] text-slate-300 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-800 transition-colors">{log.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
