import React, { useState } from 'react';
import { AppProvider, useApp, ScreenType } from './context/AppContext';
import { ScanScreen } from './components/screens/ScanScreen';
import { PlantFolderScreen } from './components/screens/PlantFolderScreen';
import { VoiceAssistantScreen } from './components/screens/VoiceAssistantScreen';
import { 
  Scan, 
  FolderHeart, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Sprout, 
  ArrowRight,
  LayoutGrid, 
  Smartphone 
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();
  const [viewMode, setViewMode] = useState<'poster' | 'single'>('poster');

  return (
    <div className="min-h-screen bg-[#F0F5F2] text-slate-800 flex flex-col font-sans">
      {/* Top Banner Navigation / Control Bar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#10564F] flex items-center justify-center text-white shadow-md">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-emerald-950 flex items-center gap-1.5 leading-none">
                PhytoScan <span className="text-emerald-600">AI</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Frontend Interactif & Navigation Inter-Écrans</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('poster')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'poster'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              <span>Vue Présentation (3 Écrans)</span>
            </button>

            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'single'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Simulateur Mobile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        {/* Poster Header Tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Agriculture de précision intelligente</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 tracking-tight flex items-center justify-center gap-3">
            <span className="w-9 h-9 md:w-11 md:h-11 inline-flex items-center justify-center text-emerald-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </span>
            PhytoScan AI
          </h2>
          <p className="text-base md:text-lg text-emerald-900/80 font-medium max-w-2xl mx-auto mt-2">
            Des plantes en meilleure santé, grâce à l'intelligence artificielle.
          </p>
        </div>

        {/* POSTER VIEW: All 3 screens displayed side-by-side with step headers */}
        {viewMode === 'poster' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative pb-8">
            {/* Column 1: Scan */}
            <div className="flex flex-col items-center relative">
              <div className="w-full max-w-[380px] mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[#10564F] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Détection des maladies par l'IA
                  </h3>
                </div>
                <p className="text-xs text-gray-600 pl-10">
                  Une analyse rapide et précise de l'état de vos plantes.
                </p>
              </div>

              <div className="w-full max-w-[380px] h-[640px]">
                <ScanScreen />
              </div>

              {/* Step Transition Arrow (Desktop) */}
              <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-emerald-600 text-white items-center justify-center shadow-lg pointer-events-none">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Column 2: Digital Plant Folder */}
            <div className="flex flex-col items-center relative">
              <div className="w-full max-w-[380px] mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[#10564F] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Dossier numérique des plantes
                  </h3>
                </div>
                <p className="text-xs text-gray-600 pl-10">
                  Toutes les informations de vos plantes au même endroit.
                </p>
              </div>

              <div className="w-full max-w-[380px] h-[640px]">
                <PlantFolderScreen />
              </div>

              {/* Step Transition Arrow (Desktop) */}
              <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-emerald-600 text-white items-center justify-center shadow-lg pointer-events-none">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Column 3: Voice Assistant & Alerts */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[380px] mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[#10564F] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Assistant vocal et alertes
                  </h3>
                </div>
                <p className="text-xs text-gray-600 pl-10">
                  Posez vos questions, recevez des réponses et ne manquez aucune intervention.
                </p>
              </div>

              <div className="w-full max-w-[380px] h-[640px]">
                <VoiceAssistantScreen />
              </div>
            </div>
          </div>
        )}

        {/* SINGLE PHONE SIMULATOR VIEW (Interactive Screen by Screen) */}
        {viewMode === 'single' && (
          <div className="flex flex-col items-center justify-center pb-6">
            <div className="w-full max-w-[400px] h-[690px] bg-white rounded-[40px] shadow-2xl border-4 border-slate-800 p-2 flex flex-col justify-between">
              {/* Active Screen */}
              <div className="flex-1 overflow-hidden rounded-[28px]">
                {currentScreen === 'scan' && <ScanScreen />}
                {currentScreen === 'folder' && <PlantFolderScreen />}
                {currentScreen === 'assistant' && <VoiceAssistantScreen />}
              </div>

              {/* Bottom Mobile Tab Bar */}
              <nav className="flex justify-around items-center pt-2.5 pb-1 border-t border-gray-100 bg-white">
                <button
                  onClick={() => navigateTo('scan' as ScreenType)}
                  className={`flex flex-col items-center text-[10px] font-bold transition ${
                    currentScreen === 'scan' ? 'text-[#10564F]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Scan className="w-5 h-5 mb-0.5" />
                  <span>Scanner</span>
                </button>

                <button
                  onClick={() => navigateTo('folder' as ScreenType)}
                  className={`flex flex-col items-center text-[10px] font-bold transition ${
                    currentScreen === 'folder' ? 'text-[#10564F]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FolderHeart className="w-5 h-5 mb-0.5" />
                  <span>Mes plantes</span>
                </button>

                <button
                  onClick={() => navigateTo('assistant' as ScreenType)}
                  className={`flex flex-col items-center text-[10px] font-bold transition relative ${
                    currentScreen === 'assistant' ? 'text-[#10564F]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Bot className="w-5 h-5 mb-0.5" />
                  <span>Assistant</span>
                  {/* Badge alerte rouge */}
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-3 ring-2 ring-white"></span>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Bottom Feature Badges (Matching scan.jpeg footer) */}
        <div className="mt-8 pt-6 border-t border-emerald-900/10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0e4a3b] text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm">IA & Vision par ordinateur</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Une technologie de pointe au service des plantes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Simple et intuitif</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Une application pensée pour les utilisateurs</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Sécurisé</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Vos données restent sous votre contrôle</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
