
import React, { useEffect, useState } from 'react';

interface NotificationBannerProps {
  message: string | null;
  onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        // We keep it visible until the user closes it or a new one comes
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-1 shadow-xl shadow-indigo-100 animate-in slide-in-from-top-4 duration-500">
      <div className="bg-white/10 backdrop-blur-sm rounded-[22px] px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-lg shrink-0">
            <i className="fa-solid fa-star animate-pulse"></i>
          </div>
          <div>
            <h4 className="text-white font-black text-sm tracking-tight uppercase opacity-80">Coach's Corner</h4>
            <p className="text-white font-medium text-lg leading-tight">{message}</p>
          </div>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
