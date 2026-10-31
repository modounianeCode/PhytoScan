import { Plant, DiseaseDetection, SupportedLanguage } from '../types';
import { mockPlants, mockDetection } from '../data/mockData';

// Configuration de l'URL du Backend (FastAPI, Flask, Django ou Express)
// Peut être configurée dans un fichier .env (VITE_API_URL=http://localhost:8000/api)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Interrupteur intelligent :
// - true : utilise les données simulées en attendant le backend
// - false : effectue les vrais appels HTTP vers l'API d'IA et de base de données
export const USE_MOCK = true;

/**
 * Service pour la détection des maladies foliaires par IA (Vision par ordinateur)
 */
export async function analyzeLeafImage(imageBlobOrFile: Blob | File | string): Promise<DiseaseDetection> {
  if (USE_MOCK) {
    // Simulation du temps de traitement par le réseau de neurones (1.8s)
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return mockDetection;
  }

  const formData = new FormData();
  if (typeof imageBlobOrFile === 'string') {
    // Si c'est du base64
    const response = await fetch(imageBlobOrFile);
    const blob = await response.blob();
    formData.append('image', blob, 'leaf_scan.jpg');
  } else {
    formData.append('image', imageBlobOrFile);
  }

  const res = await fetch(`${API_BASE_URL}/scan/disease`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Erreur lors du scan : ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Récupérer la liste des plantes enregistrées
 */
export async function fetchPlants(): Promise<Plant[]> {
  if (USE_MOCK) {
    return mockPlants;
  }

  const res = await fetch(`${API_BASE_URL}/plants`);
  if (!res.ok) throw new Error("Impossible de charger les plantes");
  return await res.json();
}

/**
 * Sauvegarder une nouvelle plante après diagnostic
 */
export async function savePlantRecord(plant: Partial<Plant>): Promise<Plant> {
  if (USE_MOCK) {
    const newPlant: Plant = {
      id: `p-${Date.now()}`,
      name: plant.name || 'Plante diagnostiquée',
      code: `P-00${Math.floor(Math.random() * 90) + 10}`,
      status: plant.status || 'healthy',
      statusLabel: plant.status === 'sick' ? 'Malade' : 'Saine',
      image: plant.image || 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
      species: plant.species || 'Tomate',
      growthStage: plant.growthStage || 'Floraison',
      plantingDate: plant.plantingDate || 'Avril 2025',
      lastObservation: 'Aujourd’hui',
      history: plant.history || [],
      care: plant.care || [],
      observations: plant.observations || [],
    };
    return newPlant;
  }

  const res = await fetch(`${API_BASE_URL}/plants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plant),
  });

  if (!res.ok) throw new Error("Erreur de sauvegarde de la plante");
  return await res.json();
}

/**
 * Poser une question à l'Assistant Vocal IA (supportant le Wolof, Français et Anglais)
 */
export async function queryAssistant(question: string, lang: SupportedLanguage): Promise<{ answer: string }> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    let answer = '';
    if (lang === 'wo') {
      answer = 'Dafa am solo nga dindi xob yi féebar te bul sotti ndox ci xob yi. Nga def ci garabu néem mbaa purin.';
    } else if (lang === 'en') {
      answer = 'Immediately prune the infected leaves and avoid watering overhead. Apply an approved organic copper fungicide.';
    } else {
      answer = 'Coupez immédiatement les feuilles les plus atteintes et arrosez uniquement au pied. Appliquez un fongicide au cuivre ou du purin de prêle.';
    }
    return { answer };
  }

  const res = await fetch(`${API_BASE_URL}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, language: lang }),
  });

  if (!res.ok) throw new Error("Erreur de réponse de l'assistant");
  return await res.json();
}
