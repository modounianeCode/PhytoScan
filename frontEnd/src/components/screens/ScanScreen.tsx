import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Camera, CheckCircle2, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { mockDetection } from '../../data/mockData';

interface ScanScreenProps {
  onNextScreen?: () => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(85);

  const handleNewScan = () => {
    setIsAnalyzing(true);
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/80 max-w-[380px] w-full mx-auto select-none">
      {/* Header */}
      <Header showBack={true} />

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin">
        {/* Camera Viewfinder Area */}
        <div className="relative w-full h-52 bg-slate-900 rounded-2xl overflow-hidden shadow-inner group">
          <img 
            src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80" 
            alt="Feuille scannée" 
            className="w-full h-full object-cover brightness-95"
          />

          {/* Viewfinder Target Brackets */}
          <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl shadow-sm drop-shadow-md"></div>
              <div className="w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl shadow-sm drop-shadow-md"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl shadow-sm drop-shadow-md"></div>
              <div className="w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl shadow-sm drop-shadow-md"></div>
            </div>
          </div>

          {/* Real-time AI Scan effect */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse absolute top-1/2"></div>
            </div>
          )}

          {/* Tag IA */}
          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>IA Active</span>
          </div>
        </div>

        {/* Status / Progress Card */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Loader2 className={`w-3.5 h-3.5 text-emerald-600 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? "Analyse en cours..." : "Diagnostic terminé"}</span>
            </div>
            <span className="text-emerald-700 font-bold">{progress}%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-emerald-100/70 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* AI Result Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>{mockDetection.title}</span>
            </div>
            <div className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-100">
              <span>{mockDetection.status === 'infected' ? 'Maladie détectée' : 'Plante saine'}</span>
              <ChevronRight className="w-3 h-3 text-red-500" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 pl-6">
            {mockDetection.diseaseName}
          </p>
        </div>

        {/* Comparison Section */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-gray-800 tracking-wide">Comparaison</h4>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Healthy Plant */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-1.5 flex flex-col items-center">
              <div className="w-full h-20 rounded-lg overflow-hidden mb-1.5">
                <img 
                  src={mockDetection.healthySampleImg} 
                  alt="Plante saine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="w-full text-center text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 py-1 rounded-md">
                Plante saine
              </span>
            </div>

            {/* Sick Plant */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-1.5 flex flex-col items-center">
              <div className="w-full h-20 rounded-lg overflow-hidden mb-1.5">
                <img 
                  src={mockDetection.infectedSampleImg} 
                  alt="Plante malade" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="w-full text-center text-[11px] font-semibold text-red-700 bg-red-100/80 py-1 rounded-md">
                Plante malade
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1 pb-1">
          <button 
            onClick={handleNewScan}
            disabled={isAnalyzing}
            className="w-full bg-[#0e4a3b] hover:bg-[#0b382d] active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition text-sm"
          >
            <Camera className="w-4 h-4" />
            <span>{isAnalyzing ? "Analyse..." : "Nouvelle analyse"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
