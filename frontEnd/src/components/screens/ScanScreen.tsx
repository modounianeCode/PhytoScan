import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../common/Header';
import { 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  Loader2, 
  Sparkles, 
  FolderPlus, 
  MessageSquareText, 
  Upload, 
  Video, 
  Image as ImageIcon,
  X,
  ShieldAlert,
  Info,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScanScreen: React.FC = () => {
  const { currentDetection, navigateTo, addPlantFromScan } = useApp();
  
  // États de l'analyse et de la caméra
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(85);
  const [analysisStepText, setAnalysisStepText] = useState('Diagnostic terminé');
  const [activeSource, setActiveSource] = useState<'demo' | 'camera' | 'upload'>('demo');
  const [imagePreview, setImagePreview] = useState<string>(
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80'
  );
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Modales d'approfondissement
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState<null | 'healthy' | 'sick'>(null);

  // Références DOM pour Caméra et Fichiers
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Démarrer la vraie caméra
  const startCamera = async () => {
    try {
      setCameraError(null);
      setActiveSource('camera');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: unknown) {
      console.warn("Accès caméra refusé ou non supporté:", err);
      setCameraError("Impossible d'accéder à la caméra (navigateur ou permissions).");
      setActiveSource('demo');
      setCameraActive(false);
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capture de l'image de la caméra
  const captureCameraFrame = (): string | null => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg');
      }
    }
    return null;
  };

  // Gestion de l'import de fichier photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
          setActiveSource('upload');
          startScanAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Lancer l'analyse du scan avec animation réaliste
  const startScanAnalysis = () => {
    if (activeSource === 'camera' && cameraActive) {
      const snapshot = captureCameraFrame();
      if (snapshot) {
        setImagePreview(snapshot);
      }
    }

    setIsAnalyzing(true);
    setProgress(5);
    setAnalysisStepText('Prétraitement de la feuille...');

    const steps = [
      { at: 25, text: 'Détection des nervures et contours...' },
      { at: 55, text: 'Analyse des nécroses et taches...' },
      { at: 80, text: 'Classification IA du pathogène...' },
      { at: 100, text: 'Diagnostic terminé' }
    ];

    let currentProgress = 5;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        setAnalysisStepText('Diagnostic terminé');
        setIsAnalyzing(false);
      } else {
        setProgress(currentProgress);
        const match = steps.find((s) => currentProgress <= s.at);
        if (match) setAnalysisStepText(match.text);
      }
    }, 320);
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/80 max-w-[380px] w-full mx-auto select-none relative">
      {/* Hidden elements pour capture caméra et upload */}
      <canvas ref={canvasRef} className="hidden" />
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Header */}
      <Header showBack={true} />

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-2.5 space-y-3 scrollbar-thin">
        
        {/* Barre de sélection de la source (Démo / Caméra / Importer) */}
        <div className="flex items-center justify-between bg-gray-100/90 p-1 rounded-xl text-[11px] font-semibold border border-gray-200">
          <button
            onClick={() => {
              stopCamera();
              setActiveSource('demo');
              setImagePreview('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80');
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition ${
              activeSource === 'demo' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Démo</span>
          </button>

          <button
            onClick={startCamera}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition ${
              activeSource === 'camera' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>Caméra</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition ${
              activeSource === 'upload' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Importer</span>
          </button>
        </div>

        {cameraError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] p-2 rounded-xl flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Camera Viewfinder Area */}
        <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden shadow-inner group">
          {activeSource === 'camera' && cameraActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover" 
            />
          ) : (
            <img 
              src={imagePreview} 
              alt="Feuille scannée" 
              className="w-full h-full object-cover brightness-95"
            />
          )}

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

          {/* Scanning Laser Beam (Rayon laser vert animé) */}
          {isAnalyzing && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Laser Line */}
              <div className="absolute w-full h-1 bg-gradient-to-r from-emerald-500/10 via-emerald-400 to-emerald-500/10 shadow-[0_0_12px_#10B981] animate-scan-laser">
                <div className="w-12 h-1 bg-white mx-auto rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[0.5px]"></div>
            </div>
          )}

          {/* Badge IA */}
          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>IA Active (96.4%)</span>
          </div>
        </div>

        {/* Status / Progress Card */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-950 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Loader2 className={`w-3.5 h-3.5 text-emerald-600 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span className="truncate max-w-[200px]">{analysisStepText}</span>
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

        {/* AI Result Card - Clic pour ouvrir la modale détaillée */}
        <div 
          onClick={() => setShowDetailModal(true)}
          className="bg-white border border-gray-200/90 rounded-2xl p-3 shadow-sm hover:border-emerald-400 hover:shadow-md transition cursor-pointer group"
          title="Cliquer pour afficher les détails complets de la pathologie"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>{currentDetection.title}</span>
            </div>
            <div className="flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-100 group-hover:bg-red-100 transition">
              <span>{currentDetection.status === 'infected' ? 'Maladie détectée' : 'Plante saine'}</span>
              <ChevronRight className="w-3 h-3 text-red-500 group-hover:translate-x-0.5 transition" />
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-800 pl-5 flex items-center justify-between">
            <span>{currentDetection.diseaseName}</span>
            <span className="text-[10px] text-gray-400 font-normal">En savoir plus</span>
          </p>
        </div>

        {/* Comparison Section */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-800 tracking-wide">Comparaison</h4>
            <span className="text-[10px] text-gray-400">Cliquez pour agrandir</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Healthy Plant Thumbnail */}
            <div 
              onClick={() => setShowComparisonModal('healthy')}
              className="bg-gray-50 border border-gray-100 rounded-xl p-1.5 flex flex-col items-center cursor-pointer hover:border-emerald-300 transition group relative"
            >
              <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 relative">
                <img 
                  src={currentDetection.healthySampleImg} 
                  alt="Plante saine" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <Maximize2 className="w-3 h-3 text-white absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition drop-shadow-md" />
              </div>
              <span className="w-full text-center text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 py-0.5 rounded-md">
                Plante saine
              </span>
            </div>

            {/* Sick Plant Thumbnail */}
            <div 
              onClick={() => setShowComparisonModal('sick')}
              className="bg-gray-50 border border-gray-100 rounded-xl p-1.5 flex flex-col items-center cursor-pointer hover:border-red-300 transition group relative"
            >
              <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 relative">
                <img 
                  src={currentDetection.infectedSampleImg} 
                  alt="Plante malade" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <Maximize2 className="w-3 h-3 text-white absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition drop-shadow-md" />
              </div>
              <span className="w-full text-center text-[10px] font-semibold text-red-700 bg-red-100/80 py-0.5 rounded-md">
                Plante malade
              </span>
            </div>
          </div>
        </div>

        {/* Passerelles interactives vers Dossier & Assistant */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={() => addPlantFromScan('Tomate (Parcelle A)')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition active:scale-95"
            title="Enregistrer cette plante dans votre carnet de santé"
          >
            <FolderPlus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ajouter au dossier</span>
          </button>

          <button
            onClick={() => navigateTo('assistant')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition active:scale-95"
            title="Demander conseil à l'assistant vocal"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-emerald-700" />
            <span>Demander conseil</span>
          </button>
        </div>

        {/* Bouton Action Principal : Nouvelle analyse */}
        <div className="pt-0.5 pb-1">
          <button 
            onClick={startScanAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-[#0e4a3b] hover:bg-[#0b382d] active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition text-xs"
          >
            <Camera className="w-4 h-4" />
            <span>{isAnalyzing ? "Analyse en cours..." : "Nouvelle analyse"}</span>
          </button>
        </div>
      </div>

      {/* MODALE DÉTAILLÉE DE LA MALADIE */}
      {showDetailModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end p-2 animate-fadeIn">
          <div className="bg-white rounded-3xl p-4 space-y-3 max-h-[85%] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-sm text-gray-900">Diagnostic Détaillé</h4>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Précision IA : {currentDetection.confidence}%
              </span>
              <h5 className="text-base font-extrabold text-gray-900 pt-1">
                {currentDetection.diseaseName}
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                {currentDetection.description}
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 space-y-1.5">
              <h6 className="text-xs font-bold text-amber-900">Actions recommandées :</h6>
              <ul className="text-xs text-amber-950 space-y-1 pl-4 list-disc">
                {currentDetection.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  addPlantFromScan();
                }}
                className="flex-1 py-2.5 bg-[#0e4a3b] hover:bg-[#0b382d] text-white text-xs font-bold rounded-xl text-center shadow-sm"
              >
                Sauvegarder la plante
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  navigateTo('assistant');
                }}
                className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl text-center border border-emerald-200"
              >
                Consulter l'IA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE COMPARATIF ZOOM */}
      {showComparisonModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 w-full max-w-[320px] space-y-3 shadow-2xl relative">
            <button 
              onClick={() => setShowComparisonModal(null)}
              className="absolute top-3 right-3 p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="font-bold text-sm text-gray-900">
              {showComparisonModal === 'healthy' ? "🌿 Aspect d'une Plante Saine" : "🍂 Symptômes de la Maladie"}
            </h4>

            <div className="w-full h-44 rounded-2xl overflow-hidden bg-black shadow-inner">
              <img 
                src={showComparisonModal === 'healthy' ? currentDetection.healthySampleImg : currentDetection.infectedSampleImg} 
                alt="Zoom"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-gray-600">
              {showComparisonModal === 'healthy'
                ? "Feuille verte homogène, cuticule intacte sans taches chlorotiques ni nécrose."
                : "Apparition de taches concentriques brunes avec halo chlorotique jaune, typique de la cercosporiose."}
            </p>

            <button
              onClick={() => setShowComparisonModal(null)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
