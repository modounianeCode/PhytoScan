import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plant, SupportedLanguage, DiseaseDetection, AlertNotification } from '../types';
import { mockPlants, mockAlert, mockDetection } from '../data/mockData';

export type ScreenType = 'scan' | 'folder' | 'assistant';

interface AppContextType {
  currentScreen: ScreenType;
  history: ScreenType[];
  navigateTo: (screen: ScreenType, options?: { plantId?: string }) => void;
  goBack: () => void;
  canGoBack: boolean;

  // Données des plantes
  plants: Plant[];
  selectedPlantId: string;
  selectedPlant: Plant;
  selectPlant: (plantId: string) => void;
  addPlantFromScan: (customName?: string) => void;

  // Diagnostic actif
  currentDetection: DiseaseDetection;
  setDetection: (det: DiseaseDetection) => void;

  // Langue active (fr, wo, en)
  activeLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;

  // Alertes
  activeAlert: AlertNotification;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('scan');
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [plants, setPlants] = useState<Plant[]>(mockPlants);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('p1');
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('fr');
  const [currentDetection, setCurrentDetection] = useState<DiseaseDetection>(mockDetection);

  // Navigation avec pile d'historique
  const navigateTo = (screen: ScreenType, options?: { plantId?: string }) => {
    if (options?.plantId) {
      setSelectedPlantId(options.plantId);
    }
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((old) => old.slice(0, old.length - 1));
      setCurrentScreen(prev);
    }
  };

  const selectPlant = (id: string) => {
    setSelectedPlantId(id);
  };

  const addPlantFromScan = (customName?: string) => {
    const newId = `p${plants.length + 1}`;
    const newCode = `P-00${plants.length + 1}`;
    const newPlant: Plant = {
      id: newId,
      name: customName || `Plante ${plants.length + 1} (Scannée)`,
      code: newCode,
      status: currentDetection.status === 'infected' ? 'sick' : 'healthy',
      statusLabel: currentDetection.status === 'infected' ? 'Malade' : 'Saine',
      image: currentDetection.infectedSampleImg,
      species: 'Tomate de saison',
      growthStage: 'Floraison avancée',
      plantingDate: '15 avril 2025',
      lastObservation: 'Aujourd’hui (Scan IA)',
      history: [
        {
          date: 'Aujourd’hui',
          note: `Diagnostic IA : ${currentDetection.diseaseName} (${currentDetection.confidence}% certitude)`,
          status: currentDetection.status === 'infected' ? 'sick' : 'healthy'
        }
      ],
      care: currentDetection.recommendations,
      observations: [currentDetection.description]
    };

    setPlants((prev) => [newPlant, ...prev]);
    setSelectedPlantId(newId);
    navigateTo('folder', { plantId: newId });
  };

  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || plants[0];
  const activeAlert = mockAlert[activeLanguage];

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        history,
        navigateTo,
        goBack,
        canGoBack: history.length > 0,
        plants,
        selectedPlantId,
        selectedPlant,
        selectPlant,
        addPlantFromScan,
        currentDetection,
        setDetection: setCurrentDetection,
        activeLanguage,
        setLanguage: setActiveLanguage,
        activeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé à l’intérieur de AppProvider');
  }
  return context;
};
