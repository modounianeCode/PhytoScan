import { Plant, DiseaseDetection, ChatMessage, AlertNotification } from '../types';

export const mockPlants: Plant[] = [
  {
    id: 'p1',
    name: 'Plante 1',
    code: 'P-001',
    status: 'healthy',
    statusLabel: 'Saine',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=400&q=80',
    species: 'Tomate',
    growthStage: 'Floraison',
    plantingDate: '12 mars 2025',
    lastObservation: '20 avril 2025',
    history: [
      { date: '20 avril 2025', note: 'Feuillage vigoureux, floraison abondante', status: 'healthy' },
      { date: '05 avril 2025', note: 'Croissance régulière, pas de parasites', status: 'healthy' },
      { date: '12 mars 2025', note: 'Plantation en pleine terre', status: 'healthy' }
    ],
    care: [
      'Arrosage au pied (goutte à goutte) tous les 2 jours',
      'Paillage organique au sol pour conserver l’humidité',
      'Taille des gourmands pour aérer la plante'
    ],
    observations: [
      'Aucun symptôme cryptogamique détecté.',
      'Excellente couleur verte, tige robuste.'
    ]
  },
  {
    id: 'p2',
    name: 'Plante 2',
    code: 'P-002',
    status: 'warning',
    statusLabel: 'À surveiller',
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=400&q=80',
    species: 'Piment',
    growthStage: 'Fructification',
    plantingDate: '05 février 2025',
    lastObservation: '29 avril 2025',
    history: [
      { date: '29 avril 2025', note: 'Quelques taches jaunes isolées sur les feuilles basses', status: 'warning' },
      { date: '15 avril 2025', note: 'Premières apparitions de fruits', status: 'healthy' }
    ],
    care: [
      'Espacer les arrosages pour éviter l’excès d’humidité',
      'Surveiller l’apparition de taches brunes'
    ],
    observations: [
      'Légère sensibilité foliaire constatée. Diagnostic conseillé sous 24h.'
    ]
  },
  {
    id: 'p3',
    name: 'Plante 3',
    code: 'P-003',
    status: 'sick',
    statusLabel: 'Malade',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=400&q=80',
    species: 'Aubergine',
    growthStage: 'Développement',
    plantingDate: '20 mars 2025',
    lastObservation: '25 avril 2025',
    history: [
      { date: '25 avril 2025', note: 'Nécrose foliaire et taches concentriques', status: 'sick' }
    ],
    care: [
      'Retirer et détruire immédiatement les feuilles infectées',
      'Application d’une décoction de prêle ou fongicide homologué'
    ],
    observations: [
      'Forte suspicion d’alternariose. Risque de propagation.'
    ]
  }
];

export const mockDetection: DiseaseDetection = {
  status: 'infected',
  title: "Résultat de l'IA",
  diseaseName: 'Tache foliaire (Cercospora)',
  confidence: 96.4,
  healthySampleImg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=300&q=80',
  infectedSampleImg: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=300&q=80',
  description: 'La cercosporiose est une maladie cryptogamique causée par des champignons du genre Cercospora, produisant des taches circulaires brunes avec un halo jaune.',
  recommendations: [
    'Éliminer manuellement les feuilles les plus atteintes.',
    'Éviter d’arroser le feuillage (arroser uniquement les racines).',
    'Appliquer un traitement bio à base de cuivre ou purin d’ortie.'
  ]
};

export const mockChatMessages: Record<'fr' | 'wo' | 'en', ChatMessage[]> = {
  fr: [
    {
      id: 'm1',
      sender: 'user',
      text: 'Quelle est la santé de la plante 2 ?',
      timestamp: '10:22'
    },
    {
      id: 'm2',
      sender: 'assistant',
      text: 'La plante 2 présente des premiers signes de maladie. Je vous conseille d\'intervenir rapidement avec un traitement adapté.',
      timestamp: '10:23'
    }
  ],
  wo: [
    {
      id: 'm1',
      sender: 'user',
      text: 'Naka la wér-gi-yaramu gàncax 2 bi mel ?',
      timestamp: '10:22'
    },
    {
      id: 'm2',
      sender: 'assistant',
      text: 'Gàncax 2 bi dafa tàmbalee tàbbi féebar. Dama lay digal nga gaaw koo faj ak garab yuy dindi féebar bi.',
      timestamp: '10:23'
    }
  ],
  en: [
    {
      id: 'm1',
      sender: 'user',
      text: 'What is the health status of Plant 2?',
      timestamp: '10:22'
    },
    {
      id: 'm2',
      sender: 'assistant',
      text: 'Plant 2 shows early signs of disease. I advise taking prompt action with an appropriate fungicide treatment.',
      timestamp: '10:23'
    }
  ]
};

export const mockAlert: Record<'fr' | 'wo' | 'en', AlertNotification> = {
  fr: {
    id: 'alt-1',
    title: 'Alerte',
    message: 'La plante 2 nécessite un traitement fongicide. Intervention recommandée dans les 24h.',
    timestamp: "Aujourd'hui, 10:24",
    severity: 'urgent'
  },
  wo: {
    id: 'alt-1',
    title: 'Artu (Alerte)',
    message: 'Gàncax 2 bi soxla na garabu fungisid. Faju ko ci biir 24 waxtu.',
    timestamp: 'Tay, 10:24',
    severity: 'urgent'
  },
  en: {
    id: 'alt-1',
    title: 'Alert',
    message: 'Plant 2 requires fungicide treatment. Action recommended within 24 hours.',
    timestamp: 'Today, 10:24',
    severity: 'urgent'
  }
};
