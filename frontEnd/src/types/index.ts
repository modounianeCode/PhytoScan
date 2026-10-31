export type HealthStatus = 'healthy' | 'warning' | 'sick';

export interface Plant {
  id: string;
  name: string;
  code: string;
  status: HealthStatus;
  statusLabel: string;
  image: string;
  species: string;
  growthStage: string;
  plantingDate: string;
  lastObservation: string;
  history?: { date: string; note: string; status: HealthStatus }[];
  care?: string[];
  observations?: string[];
}

export interface DiseaseDetection {
  status: 'healthy' | 'infected';
  title: string;
  diseaseName: string;
  confidence: number;
  healthySampleImg: string;
  infectedSampleImg: string;
  description: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type SupportedLanguage = 'fr' | 'wo' | 'en';

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'urgent' | 'warning' | 'info';
}
