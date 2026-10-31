# PhytoScan AI - Interface Frontend

Application frontend Mobile-First développée en **React + TypeScript + Vite + Tailwind CSS** reproduisant fidèlement la maquette du dossier `images/scan.jpeg`.

## 🌿 Fonctionnalités implémentées

L'application propose deux modes d'affichage commutables depuis la barre supérieure :
1. **Vue Présentation (Poster 3 Écrans)** : Affiche les 3 écrans côte-à-côte avec les bannières explicatives et flèches de transition (idéal pour les démonstrations de projet et présentations).
2. **Simulateur Mobile** : Simule un smartphone interactif avec une barre de navigation inférieure (Scanner, Mes plantes, Assistant).

### 📱 Les 3 Écrans

- **1. Détection des maladies par l'IA (Scan)** :
  - Viseur caméra avec mires de cadrage `[ ]`.
  - Bouton interactif d'analyse avec simulation en temps réel (`Analyse en cours...` et barre de progression).
  - Carte de résultat IA (*Tache foliaire Cercospora*, statut *Maladie détectée*).
  - Comparatif visuel *Plante saine* vs *Plante malade*.
  - Bouton d'action `📷 Nouvelle analyse`.

- **2. Dossier numérique des plantes** :
  - Barre de recherche de plante avec filtre.
  - Carrousel horizontal interactif des plantes avec badges d'état (🟢 Saine, 🟡 À surveiller, 🔴 Malade).
  - Fiche détaillée dynamique par plante sélectionnée.
  - Système d'onglets fonctionnels : `Détails`, `Historique`, `Soins`, `Observations`.
  - Bouton `Voir l'historique complet`.

- **3. Assistant vocal et alertes** :
  - Historique de discussion interactive (messages utilisateur et réponses IA).
  - **Sélecteur de langue trilingue** : Français (🇮🇹/🇫🇷), **Wolof (🇸🇳)** et Anglais (🇬🇧). Le texte et les alertes s'adaptent automatiquement selon la langue choisie !
  - Synthèse vocale intégrée pour écouter les réponses de l'IA.
  - Bouton microphone avec onde sonore animée.
  - Carte d'alerte urgente et prescription d'intervention.

---

## 🚀 Lancement en local

```bash
cd frontEnd
npm install
npm run dev
```

Puis ouvrez votre navigateur à l'adresse indiquée (ex: `http://localhost:5174/`).

## 📁 Architecture des fichiers

```text
frontEnd/
├── images/
│   └── scan.jpeg              # Maquette de référence
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Header.tsx     # Barre de statut smartphone et logo
│   │   └── screens/
│   │       ├── ScanScreen.tsx           # Écran 1 : Détection IA
│   │       ├── PlantFolderScreen.tsx    # Écran 2 : Dossier plantes
│   │       └── VoiceAssistantScreen.tsx # Écran 3 : Assistant vocal & langues
│   ├── data/
│   │   └── mockData.ts        # Données de test (plantes, diagnostics, traductions Wolof/FR/EN)
│   ├── types/
│   │   └── index.ts           # Types TypeScript
│   ├── App.tsx                # Conteneur principal (Poster 3 écrans + simulateur mobile)
│   ├── main.tsx
│   └── index.css              # Styles Tailwind & animations personnalisées
├── tailwind.config.js
└── vite.config.ts
```
