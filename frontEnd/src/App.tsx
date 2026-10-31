import React from 'react';
import { AppProvider, useApp, ScreenType } from './context/AppContext';
import { ScanScreen } from './components/screens/ScanScreen';
import { PlantFolderScreen } from './components/screens/PlantFolderScreen';
import { VoiceAssistantScreen } from './components/screens/VoiceAssistantScreen';
import { SidebarDrawer } from './components/common/SidebarDrawer';
import { Scan, FolderHeart, Bot } from 'lucide-react';

const MobileApp: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans antialiased relative">
      {/* Volet Latéral Menu Hamburger */}
      <SidebarDrawer />

      {/* Contenu Principal plein écran dans le navigateur (avec largeur optimale fluide) */}
      <div className="flex-1 w-full max-w-lg mx-auto bg-white shadow-xs border-x border-gray-100 flex flex-col relative min-h-screen">
        
        {/* Écran actif unique */}
        <main className="flex-1 flex flex-col pb-16 overflow-y-auto">
          {currentScreen === 'scan' && <ScanScreen />}
          {currentScreen === 'folder' && <PlantFolderScreen />}
          {currentScreen === 'assistant' && <VoiceAssistantScreen />}
        </main>

        {/* Barre de navigation inférieure fixe */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto flex justify-around items-center pt-2.5 pb-3 border-t border-gray-200 bg-white/95 backdrop-blur-md z-40 select-none px-4 shadow-lg">
          <button
            onClick={() => navigateTo('scan' as ScreenType)}
            className={`flex flex-col items-center text-[11px] font-bold transition-all ${
              currentScreen === 'scan' 
                ? 'text-[#10564F] scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${currentScreen === 'scan' ? 'bg-emerald-50 text-emerald-800' : ''}`}>
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
            <div className={`p-1 rounded-xl transition ${currentScreen === 'folder' ? 'bg-emerald-50 text-emerald-800' : ''}`}>
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
            <div className={`p-1 rounded-xl transition ${currentScreen === 'assistant' ? 'bg-emerald-50 text-emerald-800' : ''}`}>
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
