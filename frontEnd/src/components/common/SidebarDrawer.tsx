import React from 'react';
import { 
  X, 
  MapPin, 
  Sun, 
  Wind, 
  Droplets, 
  Wifi, 
  Globe2, 
  ChevronRight,
  Camera,
  FolderHeart,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../context/AppContext';

export const SidebarDrawer: React.FC = () => {
  const { isMenuOpen, closeMenu, navigateTo, activeLanguage, setLanguage, plants } = useApp();

  if (!isMenuOpen) return null;

  const healthyCount = plants.filter((p) => p.status === 'healthy').length;
  const warningCount = plants.filter((p) => p.status === 'warning').length;
  const sickCount = plants.filter((p) => p.status === 'sick').length;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex">
      {/* Backdrop sombre avec flou */}
      <div 
        onClick={closeMenu}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Volet Latéral (Drawer) */}
      <div className="relative w-4/5 max-w-[310px] ml-auto h-full bg-white shadow-2xl flex flex-col justify-between z-10 animate-slideLeft border-l border-gray-100">
        
        {/* Contenu Défilable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          
          {/* Header du Drawer avec bouton Fermer */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#10564F] flex items-center justify-center text-white font-bold text-xs">
                🌾
              </div>
              <span className="font-extrabold text-sm text-emerald-950">PhytoScan Profil</span>
            </div>
            <button 
              onClick={closeMenu}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profil Agriculteur */}
          <div className="bg-emerald-50/80 border border-emerald-100/90 rounded-2xl p-3 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                MN
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 leading-tight">Modou Niane</h4>
                <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>Zone des Niayes (Sénégal)</span>
                </p>
                <span className="text-[10px] text-gray-500 font-medium">Exploitation : 2.5 Hectares</span>
              </div>
            </div>
          </div>

          {/* Widget Météo Agricole en Direct */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/70 rounded-2xl p-3 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Météo Agricole Locale</span>
              </div>
              <span className="text-base font-extrabold text-amber-950">28°C</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 pt-0.5">
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Humidité : 65%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-teal-600" />
                <span>Vent : 12 km/h</span>
              </div>
            </div>

            <div className="bg-white/80 rounded-xl p-2 text-[10px] text-amber-900 font-medium leading-snug border border-amber-100">
              💡 <strong>Conseil agronomique :</strong> Conditions idéales pour l'application foliaire ce matin (vent calme).
            </div>
          </div>

          {/* Bilan Rapide des Parcelles */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-3 space-y-2">
            <h5 className="font-bold text-xs text-gray-900">Bilan de santé des parcelles</h5>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2">
                <span className="block font-extrabold text-sm text-emerald-800">{healthyCount}</span>
                <span className="text-[10px] text-emerald-700 font-medium">Saines</span>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-2">
                <span className="block font-extrabold text-sm text-amber-800">{warningCount}</span>
                <span className="text-[10px] text-amber-700 font-medium">Surveillance</span>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-2">
                <span className="block font-extrabold text-sm text-red-800">{sickCount}</span>
                <span className="text-[10px] text-red-700 font-medium">Urgentes</span>
              </div>
            </div>
          </div>

          {/* Raccourcis de Navigation Rapide */}
          <div className="space-y-1">
            <h5 className="font-bold text-xs text-gray-400 px-1 mb-1">Raccourcis rapides</h5>
            
            <button
              onClick={() => navigateTo('scan' as ScreenType)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Nouveau Scan IA</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => navigateTo('folder' as ScreenType)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <FolderHeart className="w-4 h-4 text-emerald-700" />
                <span>Dossier des plantes</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => navigateTo('assistant' as ScreenType)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-emerald-700" />
                <span>Assistant vocal agronomique</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Choix de la langue */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 px-1">
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Langue de l'application</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setLanguage('fr')}
                className={`py-1.5 rounded-xl border text-center transition ${
                  activeLanguage === 'fr' ? 'bg-[#10564F] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage('wo')}
                className={`py-1.5 rounded-xl border text-center transition ${
                  activeLanguage === 'wo' ? 'bg-[#10564F] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Wolof
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`py-1.5 rounded-xl border text-center transition ${
                  activeLanguage === 'en' ? 'bg-[#10564F] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Footer du Drawer : Statut de Synchronisation Hors-ligne */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-600">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              Mode Terrain (Hors-ligne)
            </span>
            <span className="text-[10px] text-gray-400">Prêt</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-tight">
            PhytoScan AI v1.0.0 • Développé pour les producteurs agricoles
          </p>
        </div>
      </div>
    </div>
  );
};
