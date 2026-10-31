import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Search, SlidersHorizontal, ChevronRight, Sprout, Flower2, Calendar, Clock, HeartHandshake, Eye, Camera, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthStatus } from '../../types';

export const PlantFolderScreen: React.FC = () => {
  const { plants, selectedPlant, selectedPlantId, selectPlant, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'care' | 'observations'>('details');

  const filteredPlants = plants.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: HealthStatus, label: string) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {label}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {label}
          </span>
        );
      case 'sick':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {label}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/80 max-w-[380px] w-full mx-auto select-none">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin">
        {/* Title + Quick Scan shortcut */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Mes plantes</h3>
          <button
            onClick={() => navigateTo('scan')}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 transition"
            title="Scanner une nouvelle plante"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scanner</span>
          </button>
        </div>

        {/* Search Bar + Filter */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher une plante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>
          <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:text-emerald-700 hover:border-emerald-300 transition">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Plant Carousel / Grid */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {filteredPlants.map((plant) => {
            const isSelected = plant.id === selectedPlantId;
            return (
              <div
                key={plant.id}
                onClick={() => selectPlant(plant.id)}
                className={`min-w-[95px] flex-1 bg-white border rounded-xl p-2 flex flex-col items-center cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-emerald-600 shadow-sm ring-1 ring-emerald-600 bg-emerald-50/20 scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden mb-1.5 bg-gray-100">
                  <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-gray-800 mb-1 line-clamp-1">{plant.name}</span>
                {getStatusBadge(plant.status, plant.statusLabel)}
              </div>
            );
          })}
        </div>

        {/* Selected Plant Detailed Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-sm space-y-3">
          {/* Header of Detail */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">{selectedPlant.name}</h4>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusBadge(selectedPlant.status, selectedPlant.statusLabel)}
                  <span className="text-xs text-gray-400 font-medium">ID : {selectedPlant.code}</span>
                </div>
              </div>
            </div>

            {/* Quick action: ask AI about this plant */}
            <button
              onClick={() => navigateTo('assistant')}
              className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition"
              title="Demander conseil à l'assistant pour cette plante"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-1.5 px-2.5 transition relative ${
                activeTab === 'details'
                  ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Détails
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-1.5 px-2.5 transition relative ${
                activeTab === 'history'
                  ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Historique
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-1.5 px-2.5 transition relative ${
                activeTab === 'care'
                  ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Soins
            </button>
            <button
              onClick={() => setActiveTab('observations')}
              className={`pb-1.5 px-2.5 transition relative ${
                activeTab === 'observations'
                  ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Observations
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>Espèce</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.species}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Flower2 className="w-4 h-4 text-emerald-600" />
                  <span>Stade de croissance</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedPlant.growthStage}</span>
              </div>

              <div className="flex items-center justify-between py-1">
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

          {activeTab === 'history' && (
            <div className="space-y-2 text-xs pt-1 max-h-40 overflow-y-auto">
              {selectedPlant.history?.map((h, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-700 block">{h.date}</span>
                    <span className="text-gray-500">{h.note}</span>
                  </div>
                  {getStatusBadge(h.status, '')}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-1.5 text-xs pt-1 max-h-40 overflow-y-auto">
              {selectedPlant.care?.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-700">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'observations' && (
            <div className="space-y-1.5 text-xs pt-1 max-h-40 overflow-y-auto">
              {selectedPlant.observations?.map((obs, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-700">
                  <Eye className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: Voir l'historique complet */}
        <div className="pt-1 pb-1">
          <button 
            onClick={() => setActiveTab('history')}
            className="w-full bg-[#0e4a3b] hover:bg-[#0b382d] active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition text-sm"
          >
            <span>Voir l'historique complet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
