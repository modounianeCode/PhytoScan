import React from 'react';
import { Menu, ChevronLeft, Wifi, Battery, Signal } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, onBack, onMenuClick }) => {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      {/* Mobile OS Status Bar */}
      <div className="flex justify-between items-center px-5 pt-2 pb-1 text-xs text-gray-800 font-semibold">
        <span>9:41</span>
        <div className="flex items-center space-x-1.5 text-gray-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center space-x-2">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-1 -ml-1 text-gray-600 hover:text-emerald-800 rounded-full hover:bg-gray-100 transition"
              aria-label="Retour"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center text-emerald-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-emerald-900 tracking-tight flex items-center gap-1">
              PhytoScan <span className="text-emerald-600">AI</span>
            </span>
          </div>
        </div>

        <button 
          onClick={onMenuClick}
          className="p-1.5 text-gray-700 hover:text-emerald-800 rounded-lg hover:bg-gray-100 transition"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
