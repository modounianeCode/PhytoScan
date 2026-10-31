import React, { useState } from 'react';
import { Header } from '../common/Header';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  Sprout, 
  Flower2, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  Eye, 
  Camera, 
  MessageSquare,
  Plus,
  PlusCircle,
  X,
  History,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthStatus, Plant } from '../../types';

export const PlantFolderScreen: React.FC = () => {
  const { plants, selectedPlant, selectedPlantId, selectPlant, navigateTo } = useApp();
  
  // États de recherche et de filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | HealthStatus>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'care' | 'observations'>('details');

  // Modales d'historique complet et d'ajout de note
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Filtrage combiné par recherche et par statut de santé
  const filteredPlants = plants.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: HealthStatus, label: string) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {label || 'Saine'}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {label || 'À surveiller'}
          </span>
        );
      case 'sick':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {label || 'Malade'}
          </span>
        );
    }
  };

  const handleAddObservation = () => {
    if (newNoteText.trim() && selectedPlant.observations) {
      selectedPlant.observations.unshift(newNoteText.trim());
      setNewNoteText('');
      setShowAddNoteModal(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/80 max-w-[380px] w-full mx-auto select-none relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-2.5 space-y-3 scrollbar-thin">
        
        {/* Titre & Raccourci Scan */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Mes plantes</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.2 rounded-full">
              {filteredPlants.length}
            </span>
          </div>

          <button
            onClick={() => navigateTo('scan')}
            className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hover:border-emerald-300 transition active:scale-95 shadow-2xs"
            title="Scanner une nouvelle plante"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scanner</span>
          </button>
        </div>

        {/* Barre de Recherche + Bouton Filtres */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher une plante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button 
            onClick={() => setShowFilterModal(true)}
            className={`p-2 rounded-xl border transition relative ${
              statusFilter !== 'all' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-emerald-700'
            }`}
            title="Filtrer les plantes"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {statusFilter !== 'all' && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 absolute top-1 right-1 ring-2 ring-white"></span>
            )}
          </button>
        </div>

        {/* Carrousel Horizontal des Plantes */}
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
          {filteredPlants.map((plant: Plant) => {
            const isSelected = plant.id === selectedPlantId;
            return (
              <div
                key={plant.id}
                onClick={() => selectPlant(plant.id)}
                className={`min-w-[95px] max-w-[105px] flex-1 bg-white border rounded-2xl p-2 flex flex-col items-center cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20 bg-emerald-50/20 scale-[1.02]' 
                    : 'border-gray-200/80 hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden mb-1.5 bg-gray-100 shadow-2xs">
                  <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-gray-900 mb-1 line-clamp-1 text-center">{plant.name}</span>
                {getStatusBadge(plant.status, plant.statusLabel)}
              </div>
            );
          })}

          {/* Bouton Ajouter Plante dans le carrousel */}
          <div
            onClick={() => navigateTo('scan')}
            className="min-w-[75px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-2 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition text-gray-400 hover:text-emerald-700"
            title="Scanner pour ajouter une plante"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Ajouter</span>
          </div>
        </div>

        {/* Fiche Détaillée de la Plante Sélectionnée */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-sm space-y-3">
          {/* Header de la Fiche */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-15 h-15 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-gray-900 leading-tight">{selectedPlant.name}</h4>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusBadge(selectedPlant.status, selectedPlant.statusLabel)}
                  <span className="text-xs text-gray-400 font-medium">ID : {selectedPlant.code}</span>
                </div>
              </div>
            </div>

            {/* Actions rapides : Poser une question à l'assistant sur cette plante */}
            <button
              onClick={() => navigateTo('assistant')}
              className="p-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 hover:border-emerald-300 transition active:scale-95 shadow-2xs"
              title="Demander conseil à l'assistant IA sur cette plante"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Barre d'Onglets (Détails / Historique / Soins / Observations) */}
          <div className="flex border-b border-gray-100 text-xs font-semibold justify-between">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-1.5 px-2 transition relative ${
                activeTab === 'details'
                  ? 'text-emerald-900 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Détails
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-1.5 px-2 transition relative ${
                activeTab === 'history'
                  ? 'text-emerald-900 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Historique
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-1.5 px-2 transition relative ${
                activeTab === 'care'
                  ? 'text-emerald-900 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Soins
            </button>
            <button
              onClick={() => setActiveTab('observations')}
              className={`pb-1.5 px-2 transition relative ${
                activeTab === 'observations'
                  ? 'text-emerald-900 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Observations
            </button>
          </div>

          {/* Contenu de l'Onglet Détails */}
          {activeTab === 'details' && (
            <div className="space-y-2 text-xs pt-0.5">
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>Espèce</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.species}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Flower2 className="w-4 h-4 text-emerald-600" />
                  <span>Stade de croissance</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.growthStage}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Date de plantation</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.plantingDate}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Dernière observation</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.lastObservation}</span>
              </div>
            </div>
          )}

          {/* Contenu de l'Onglet Historique */}
          {activeTab === 'history' && (
            <div className="space-y-2 text-xs pt-0.5 max-h-44 overflow-y-auto pr-1">
              {selectedPlant.history?.map((h, i) => (
                <div key={i} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex justify-between items-start">
                  <div>
                    <span className="font-bold text-gray-800 block text-[11px]">{h.date}</span>
                    <span className="text-gray-600 text-xs mt-0.5 block leading-snug">{h.note}</span>
                  </div>
                  <div className="pl-2">
                    {getStatusBadge(h.status, '')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contenu de l'Onglet Soins */}
          {activeTab === 'care' && (
            <div className="space-y-2 text-xs pt-0.5 max-h-44 overflow-y-auto pr-1">
              {selectedPlant.care?.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-700 bg-emerald-50/40 p-2 rounded-xl border border-emerald-100/60">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{c}</span>
                </div>
              ))}
            </div>
          )}

          {/* Contenu de l'Onglet Observations */}
          {activeTab === 'observations' && (
            <div className="space-y-2 text-xs pt-0.5 max-h-44 overflow-y-auto pr-1">
              <div className="flex justify-between items-center pb-1">
                <span className="text-[11px] text-gray-500 font-medium">Notes de terrain</span>
                <button
                  onClick={() => setShowAddNoteModal(true)}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:underline"
                >
                  <PlusCircle className="w-3 h-3 text-emerald-600" />
                  <span>Ajouter une note</span>
                </button>
              </div>

              {selectedPlant.observations?.map((obs, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <Eye className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{obs}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bouton d'Action : Voir l'historique complet */}
        <div className="pt-0.5 pb-1">
          <button 
            onClick={() => setShowFullHistoryModal(true)}
            className="w-full bg-[#0e4a3b] hover:bg-[#0b382d] active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition text-xs"
          >
            <span>Voir l'historique complet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MODALE FILTRES */}
      {showFilterModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end p-3 animate-fadeIn">
          <div className="bg-white rounded-3xl p-4 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-bold text-sm text-gray-900">Filtrer par état de santé</h4>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => { setStatusFilter('all'); setShowFilterModal(false); }}
                className={`p-2.5 rounded-xl border text-center transition ${
                  statusFilter === 'all' ? 'bg-[#10564F] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Toutes les plantes
              </button>

              <button
                onClick={() => { setStatusFilter('healthy'); setShowFilterModal(false); }}
                className={`p-2.5 rounded-xl border text-center transition ${
                  statusFilter === 'healthy' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                🟢 Saines
              </button>

              <button
                onClick={() => { setStatusFilter('warning'); setShowFilterModal(false); }}
                className={`p-2.5 rounded-xl border text-center transition ${
                  statusFilter === 'warning' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                🟡 À surveiller
              </button>

              <button
                onClick={() => { setStatusFilter('sick'); setShowFilterModal(false); }}
                className={`p-2.5 rounded-xl border text-center transition ${
                  statusFilter === 'sick' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800 hover:bg-red-100'
                }`}
              >
                🔴 Malades
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE HISTORIQUE COMPLET */}
      {showFullHistoryModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end p-3 animate-fadeIn">
          <div className="bg-white rounded-3xl p-4 space-y-3.5 max-h-[85%] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-sm text-gray-900">
                  Historique complet - {selectedPlant.name}
                </h4>
              </div>
              <button 
                onClick={() => setShowFullHistoryModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {selectedPlant.history?.map((h, i) => (
                <div key={i} className="border-l-2 border-emerald-600 pl-3 py-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{h.date}</span>
                    {getStatusBadge(h.status, '')}
                  </div>
                  <p className="text-gray-600">{h.note}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowFullHistoryModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MODALE AJOUT DE NOTE D'OBSERVATION */}
      {showAddNoteModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end p-3 animate-fadeIn">
          <div className="bg-white rounded-3xl p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <h4 className="font-bold text-sm text-gray-900">Nouvelle observation</h4>
              </div>
              <button 
                onClick={() => setShowAddNoteModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={3}
              placeholder="Ex: Arrosage enrichi effectué ce matin. Feuilles vigoureuses..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Annuler
              </button>
              <button
                onClick={handleAddObservation}
                disabled={!newNoteText.trim()}
                className="flex-1 py-2 bg-[#0e4a3b] hover:bg-[#0b382d] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
