
import React, { useState, useRef, useEffect } from 'react';
import { LearningState } from '../types';
import { getTutorResponseStream } from '../services/geminiService';

interface Message {
  role: 'user' | 'tutor';
  text: string;
  sources?: { uri: string; title: string }[];
}

interface ChatbotProps {
  state: LearningState;
  onEngage: () => void;
  onResponse: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ state, onEngage, onResponse }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const clearChat = () => {
    setMessages([]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatText = (text: string) => {
    // Simple formatter for bold text and proper spacing
    // Replaces **text** with bold tags and handles line breaks
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    onEngage();
    const userMsg = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.text }]
    }));

    let fullResponse = "";
    let finalSources: { uri: string; title: string }[] = [];

    try {
      setMessages(prev => [...prev, { role: 'tutor', text: '' }]);
      
      const stream = getTutorResponseStream(userMsg, state, history);
      
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        
        if (chunk.groundingMetadata?.groundingChunks) {
          chunk.groundingMetadata.groundingChunks.forEach((c: any) => {
            if (c.web?.uri) {
              finalSources.push({ uri: c.web.uri, title: c.web.title || 'Source' });
            }
          });
        }

        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          updated[lastIdx] = { 
            role: 'tutor', 
            text: fullResponse,
            sources: finalSources.length > 0 
              ? Array.from(new Map(finalSources.map(s => [s.uri, s])).values())
              : undefined
          };
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat streaming error", err);
      setMessages(prev => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        updated[lastIdx] = { 
          role: 'tutor', 
          text: "I'm having a bit of trouble connecting right now. Let's try that again in a moment!" 
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
      onResponse();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4 max-w-full">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[500px] sm:h-[650px] max-h-[calc(100vh-100px)] bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300 ease-out">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-50 bg-indigo-600 text-white flex items-center justify-between shadow-lg shadow-indigo-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg sm:text-xl backdrop-blur-sm">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h3 className="font-black text-xs sm:text-sm tracking-tight uppercase">IntelliSix Tutor</h3>
                <span className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-bold text-indigo-100 uppercase tracking-widest">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`} />
                  {isLoading ? 'Constructing Explanation...' : 'Ready to Help'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={clearChat} 
                title="Clear Chat"
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-trash-can text-xs sm:text-sm"></i>
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-base sm:text-lg"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/20 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-3xl flex items-center justify-center text-indigo-600 text-2xl sm:text-3xl shadow-sm mb-4 sm:mb-6 border border-slate-100">
                  <i className="fa-regular fa-comment-dots"></i>
                </div>
                <h4 className="text-slate-800 font-black text-lg sm:text-xl leading-tight tracking-tight">CS Personal Tutor</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-3 leading-relaxed font-medium">
                  I can help you break down complex topics like **Normalization**, **SQL Querying**, or **Logic Circuit** diagrams. How can I assist your learning today?
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col group ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                    {m.role === 'user' ? 'Student' : 'IntelliSix AI'}
                  </span>
                  {m.role === 'tutor' && !isLoading && (
                    <button 
                      onClick={() => handleCopy(m.text, i)}
                      className="text-[8px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {copiedId === i ? 'Copied!' : 'Copy Explanation'}
                    </button>
                  )}
                </div>
                <div className={`
                  max-w-[95%] px-4 py-3 sm:px-5 sm:py-4 rounded-2xl text-[12px] sm:text-[13px] leading-[1.6] shadow-sm font-medium whitespace-pre-wrap break-words
                  ${m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}
                `}>
                  {formatText(m.text)}
                  
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/50 -mx-2 px-2 rounded-lg">
                      <span className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1.5">
                        <i className="fa-solid fa-magnifying-glass text-[8px]"></i> 
                        Verified References
                      </span>
                      {m.sources.map((s, idx) => (
                        <a 
                          key={idx} 
                          href={s.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-indigo-500 hover:text-indigo-700 hover:underline flex items-center gap-2 font-bold truncate max-w-full group/link"
                        >
                          <i className="fa-solid fa-up-right-from-square text-[8px] opacity-50 group-hover/link:opacity-100"></i>
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-5 bg-white border-t border-slate-50 shrink-0">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me a question..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[16px] sm:rounded-[24px] px-5 sm:px-7 py-3.5 sm:py-4.5 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all pr-12 sm:pr-14 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`
                  absolute right-1.5 top-1.5 sm:right-2 sm:top-2 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all shadow-md
                  ${!input.trim() || isLoading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-100'}
                `}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner animate-spin text-xs sm:text-sm"></i>
                ) : (
                  <i className="fa-solid fa-arrow-up text-xs sm:text-sm"></i>
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-2">
              <p className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                CS Assistant
              </p>
              <p className="text-[8px] sm:text-[9px] text-indigo-400/60 font-black uppercase tracking-widest italic">
                Syllabus Optimized
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] sm:rounded-[28px] flex items-center justify-center text-white text-xl sm:text-2xl shadow-2xl transition-all active:scale-90 relative
          ${isOpen ? 'bg-slate-900 rotate-90 scale-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200'}
        `}
      >
        {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-comment-dots"></i>}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black animate-bounce shadow-md">
            !
          </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
