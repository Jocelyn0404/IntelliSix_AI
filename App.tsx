
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  LearningState, 
  QuizStatus, 
  ScoreLevel, 
  ImprovementStatus, 
  ErrorPattern, 
  EngagementStatus, 
  PerformanceClassification,
  LearningMaterial,
  LogEntry
} from './types';
import { INITIAL_STATE, INITIAL_MATERIALS, TOPIC_QUIZZES, GOAL_STATE, BASIC_MATERIAL } from './constants';
import LearningPath from './components/LearningPath';
import QuizModule from './components/QuizModule';
import StudyViewer from './components/StudyViewer';
import Chatbot from './components/Chatbot';
import NotificationBanner from './components/NotificationBanner';

const App: React.FC = () => {
  // Persistence removed: resets on reload.
  const [state, setState] = useState<LearningState>(INITIAL_STATE);
  const [materials, setMaterials] = useState<LearningMaterial[]>(INITIAL_MATERIALS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Quiz Session State
  const [quizSession, setQuizSession] = useState<{ topicId: string, index: number } | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [lastRawScore, setLastRawScore] = useState<{score: number, total: number} | null>(null);
  const [motivation, setMotivation] = useState<string | null>(null);

  // Study Mode State
  const [viewingMaterial, setViewingMaterial] = useState<LearningMaterial | null>(null);

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message
      },
      ...prev
    ]);
  }, []);

  // Agent Reasoning Engine - Thresholds and Unlocking Rules
  useEffect(() => {
    if (quizSession) return;

    const evaluateRules = () => {
      const foundationalMaterials = materials.filter(m => m.level === 'Foundational');
      const basicMaterial = materials.find(m => m.id === BASIC_MATERIAL.id);
      const basicMaterialExists = !!basicMaterial;
      
      // Advanced Unlock Criteria:
      // 1. No quiz score < 50% anywhere on the board
      const noCriticalFailures = materials.every(m => {
        const scores = Object.values(m.assessmentScores || {}) as number[];
        return scores.every(s => s >= 50);
      });

      // 2. All foundational quizzes must be >= 50%
      const allFoundationalPassed = foundationalMaterials.every(m => {
        const scores = Object.values(m.assessmentScores || {}) as number[];
        return m.completedAssessments.length === 2 && scores.every(score => score >= 50);
      });

      // 3. If Basic is unlocked, it must be >= 50%
      let allBasicPassed = true;
      if (basicMaterialExists && basicMaterial) {
          const scores = Object.values(basicMaterial.assessmentScores || {}) as number[];
          allBasicPassed = basicMaterial.completedAssessments.length === 2 && scores.every(s => s >= 50);
      }

      const advancedLocked = materials.some(m => m.level === 'Advanced' && m.locked);

      // Mastery Check: Unlock Advanced
      if (allFoundationalPassed && allBasicPassed && noCriticalFailures && advancedLocked) {
        addLog('REASONING', 'Unlocking Advanced: 50% threshold met.');
        setMaterials(prev => prev.map(m => m.level === 'Advanced' ? { ...m, locked: false } : m));
        setMotivation("Advanced material unlocked! You've maintained the required 50% threshold.");
        return;
      }

      // Basic Module Unlock Logic:
      // Only unlock when ALL foundational are completed AND at least one quiz score < 50%
      const allFoundationalCompleted = foundationalMaterials.every(m => m.completedAssessments.length === 2);
      const atLeastOneFoundationalCriticalFail = foundationalMaterials.some(m => {
        const scores = Object.values(m.assessmentScores || {}) as number[];
        return scores.some(s => s < 50);
      });

      if (allFoundationalCompleted && atLeastOneFoundationalCriticalFail && !basicMaterialExists) {
        addLog('REASONING', 'Critical performance gap detected. Injecting Basic Module.');
        setMaterials(prev => [BASIC_MATERIAL, ...prev]);
        setMotivation("Foundational challenges detected. I've added Basic Computing to help you bridge the gap.");
        return;
      }

      // Relock check for Advanced
      if (!noCriticalFailures && !advancedLocked) {
        addLog('REASONING', 'Score dropped below 50%. Re-locking Advanced.');
        setMaterials(prev => prev.map(m => m.level === 'Advanced' ? { ...m, locked: true } : m));
        setMotivation("Advanced modules locked. All quizzes must score at least 50% to maintain access.");
        return;
      }

      if (motivation === null) {
        const attemptedAllFoundational = foundationalMaterials.every(m => m.completedAssessments.length === 2);
        if (advancedLocked && attemptedAllFoundational) {
           setMotivation("Access to Advanced material requires at least 50% on all current quizzes.");
        }
      }
    };
    evaluateRules();
  }, [materials, state.sl, state.qs, addLog, motivation, quizSession]);

  const handleStartStudy = (material: LearningMaterial) => {
    addLog('SENSOR', `User opened study notes for ${material.title}`);
    setViewingMaterial(material);
    setQuizSession(null);
    setQuizFinished(false);
  };

  const handleCloseStudy = () => setViewingMaterial(null);

  const handleStartQuiz = (topicId: string, index: number) => {
    addLog('SENSOR', `User started Assessment ${index + 1} for topic ${topicId}`);
    setQuizSession({ topicId, index });
    setViewingMaterial(null);
    setQuizFinished(false);
    setMotivation(null);
  };

  const handleQuitQuiz = useCallback(() => {
    addLog('SENSOR', `Assessment aborted by user.`);
    setQuizSession(null);
    setQuizFinished(false);
  }, [addLog]);

  const handleQuizSubmit = (score: number, errors: number) => {
    if (!quizSession) return;
    
    const currentQuizCount = TOPIC_QUIZZES[quizSession.topicId][quizSession.index].length;
    const percentage = Math.round((Math.min(score, currentQuizCount) / currentQuizCount) * 100);
    setLastScore(percentage);
    setLastRawScore({ score, total: currentQuizCount });

    addLog('SENSOR', `Quiz Result: ${percentage}%`);

    if (percentage < 50) {
      setMotivation("Score below 50%. Mastery required for advancement.");
    } else if (percentage < 100) {
      setMotivation("Threshold passed! Aim for 100% to hit full completion.");
    } else {
      setMotivation("Perfect! 100% mastery achieved.");
    }

    setMaterials(prev => prev.map(m => {
      if (m.id === quizSession.topicId) {
        const newCompleted = m.completedAssessments.includes(quizSession.index)
          ? m.completedAssessments
          : [...m.completedAssessments, quizSession.index];
        const newScores = { ...(m.assessmentScores || {}), [quizSession.index]: percentage };
        return { ...m, completedAssessments: newCompleted, assessmentScores: newScores };
      }
      return m;
    }));

    setState(prev => ({
      ...prev,
      qs: QuizStatus.COMPLETED,
      sl: percentage < 50 ? ScoreLevel.LOW : percentage < 80 ? ScoreLevel.MEDIUM : ScoreLevel.HIGH,
      ep: errors > 0 ? ErrorPattern.HIGH : ErrorPattern.LOW,
      pc: percentage >= 80 ? PerformanceClassification.HIGH : PerformanceClassification.LOW
    }));

    setQuizSession(null);
    setQuizFinished(true);
  };

  // Completion calculation: Every quiz must hit 100% to count toward the total
  const completionPercentage = useMemo(() => {
    let perfectQuizzes = 0;
    let totalQuizzesAvailable = 0;

    materials.forEach(material => {
      const topicQuizzes = TOPIC_QUIZZES[material.id];
      if (topicQuizzes) {
        totalQuizzesAvailable += topicQuizzes.length;
        if (material.assessmentScores) {
          const hundredPercentScores = Object.values(material.assessmentScores).filter(s => s === 100).length;
          perfectQuizzes += hundredPercentScores;
        }
      }
    });

    if (totalQuizzesAvailable === 0) return 0;
    return Math.round((perfectQuizzes / totalQuizzesAvailable) * 100);
  }, [materials]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 pb-20 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-6 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-100">
              <i className="fa-solid fa-database"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800">IntelliSix DB</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mastery Tracking</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-auto w-full">
            <div className="flex justify-between items-center mb-1.5 px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Completion (100% Target)</span>
              <span className="text-[10px] font-black text-indigo-600 uppercase">{completionPercentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 w-full flex-1 flex flex-col">
        <NotificationBanner message={motivation} onClose={() => setMotivation(null)} />

        <div className="flex-1 flex flex-col mt-6">
            {quizSession ? (
              <div className="animate-in fade-in zoom-in-95 duration-300 h-[calc(100vh-180px)] min-h-[500px]">
                <QuizModule 
                  questions={TOPIC_QUIZZES[quizSession.topicId][quizSession.index]} 
                  onFinish={handleQuizSubmit} 
                  onQuit={handleQuitQuiz}
                />
              </div>
            ) : viewingMaterial ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-180px)] min-h-[500px]">
                <StudyViewer 
                  material={viewingMaterial}
                  onClose={handleCloseStudy}
                  onStartQuiz={(idx) => handleStartQuiz(viewingMaterial.id, idx)}
                />
              </div>
            ) : quizFinished ? (
              <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center animate-in zoom-in-95 duration-500 my-auto">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${
                  lastScore < 50 ? 'bg-red-50 text-red-500' : lastScore < 100 ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-600'
                }`}>
                  <i className={`fa-solid ${lastScore < 50 ? 'fa-xmark' : lastScore < 100 ? 'fa-check' : 'fa-star'}`}></i>
                </div>
                <h2 className="text-2xl font-black text-slate-800">
                  {lastScore === 100 ? 'Perfect Mastery!' : lastScore >= 50 ? 'Threshold Met' : 'Assessment Failed'}
                </h2>
                <div className={`text-6xl font-black mt-6 mb-2 ${
                  lastScore < 50 ? 'text-red-500' : lastScore < 100 ? 'text-amber-500' : 'text-green-600'
                }`}>{lastScore}%</div>
                <div className="text-lg text-slate-500 font-bold mb-8">
                  {lastScore === 100 ? "Completion updated." : "Score recorded. Advanced modules require 50% across the board."}
                </div>
                <button 
                  onClick={() => setQuizFinished(false)}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  Return to Learning Path
                </button>
              </div>
            ) : (
              <section className="space-y-6 pb-20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Learning Journey</h2>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-solid fa-rotate-right mr-1"></i> Reset All
                  </button>
                </div>
                <LearningPath 
                  materials={materials} 
                  onMaterialClick={handleStartStudy}
                  onTakeQuiz={(topicId, idx) => handleStartQuiz(topicId, idx)}
                />
              </section>
            )}
        </div>
      </main>

      <Chatbot 
        state={state} 
        onEngage={() => addLog('SENSOR', 'User engaged tutor')} 
        onResponse={() => addLog('ACTUATOR', 'AI response generated')}
      />
    </div>
  );
};

export default App;
