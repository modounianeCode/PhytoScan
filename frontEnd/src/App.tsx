import React from 'react';
import { AppProvider, useApp, ScreenType } from './context/AppContext';
import { ScanScreen } from './components/screens/ScanScreen';
import { PlantFolderScreen } from './components/screens/PlantFolderScreen';
import { VoiceAssistantScreen } from './components/screens/VoiceAssistantScreen';
import { Scan, FolderHeart, Bot } from 'lucide-react';

const MobileApp: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 md:bg-slate-100 flex items-center justify-center font-sans antialiased md:p-4">
      {/* Container Application Mobile (Plein écran sur smartphone, châssis centré sur desktop) */}
      <div className="w-full max-w-[420px] h-screen md:h-[844px] bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col justify-between md:border-8 md:border-slate-800 relative">
        
        {/* Écran actif unique */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {currentScreen === 'scan' && <ScanScreen />}
          {currentScreen === 'folder' && <PlantFolderScreen />}
          {currentScreen === 'assistant' && <VoiceAssistantScreen />}
        </main>

        {/* Barre de navigation inférieure fixe (Mobile Bottom Bar) */}
        <nav className="flex justify-around items-center pt-2.5 pb-3 border-t border-gray-100 bg-white/95 backdrop-blur-md flex-shrink-0 z-40 select-none px-4">
          <button
            onClick={() => navigateTo('scan' as ScreenType)}
            className={`flex flex-col items-center text-[11px] font-bold transition-all ${
              currentScreen === 'scan' 
                ? 'text-[#10564F] scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentScreen === 'scan' ? 'bg-emerald-50' : ''}`}>
              <Scan className="w-5 h-5 mb-0.5" />
            </div>
            <span>Scanner</span>
          </button>

          <button
            onClick={() => navigateTo('folder' as ScreenType)}
            className={`flex flex-col items-center text-[11px] font-bold transition-all ${
              currentScreen === 'folder' 
                ? 'text-[#10564F] scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentScreen === 'folder' ? 'bg-emerald-50' : ''}`}>
              <FolderHeart className="w-5 h-5 mb-0.5" />
            </div>
            <span>Mes plantes</span>
          </button>

          <button
            onClick={() => navigateTo('assistant' as ScreenType)}
            className={`flex flex-col items-center text-[11px] font-bold transition-all relative ${
              currentScreen === 'assistant' 
                ? 'text-[#10564F] scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentScreen === 'assistant' ? 'bg-emerald-50' : ''}`}>
              <Bot className="w-5 h-5 mb-0.5" />
            </div>
            <span>Assistant</span>
            {/* Pastille alerte urgente rouge */}
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-1 right-3 ring-2 ring-white animate-pulse"></span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MobileApp />
    </AppProvider>
  );
};

export default App;
