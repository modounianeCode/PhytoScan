# 🌿 PhytoScan AI - Documentation du Projet Frontend

> **"Des plantes en meilleure santé, grâce à l'intelligence artificielle."**

PhytoScan AI est une application mobile-first conçue pour aider les agriculteurs à diagnostiquer rapidement les maladies foliaires de leurs cultures par vision par ordinateur, à tenir un carnet de santé numérique de leurs parcelles et à interagir avec un assistant vocal intelligent disponible en **Wolof (🇸🇳)**, **Français (🇫🇷)** et **Anglais (🇬🇧)**.

Ce document détaille tout ce qui a été réalisé sur la partie **Frontend** du projet, son architecture technique, son état actuel et les liaisons interactives entre les écrans.

---

## 📸 1. Analyse de la Maquette de Référence

Le développement a été réalisé sur la base de la maquette présente dans [`frontEnd/images/scan.jpeg`](file:///home/modou-niane/PhytoScan/frontEnd/images/scan.jpeg).

L'application s'articule autour de 3 modules principaux :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PhytoScan AI                                   │
│            Des plantes en meilleure santé, grâce à l'IA                      │
└─────────────────────────────────────────────────────────────────────────────┘
       │                                │                                │
       ▼                                ▼                                ▼
  [ Écran 1 ]                     [ Écran 2 ]                      [ Écran 3 ]
Détection IA                 Dossier numérique                Assistant vocal
• Viseur caméra               • Recherche & filtres            • Chat interactif
• Diagnostic en direct        • Carrousel des plantes          • Reconnaissance vocale
• Comparaison saine/malade    • Fiche complète & onglets       • Trilingue (Wolof/FR/EN)
• Bouton nouveau scan         • Historique des soins           • Alertes urgentes
```

---

## 🛠️ 2. Stack Technique Retenue

- **Framework Web / SPA :** [React 18](https://react.dev/) avec [Vite](https://vitejs.dev/) (démarrage ultra-rapide et optimisé).
- **Langage :** [TypeScript](https://www.typescriptlang.org/) (typage fort, robustesse du code et autocomplétion).
- **Design & Styles :** [Tailwind CSS v3](https://tailwindcss.com/) avec une palette sur mesure :
  - **Vert Sombre Forêt (`#0e4a3b` / `#10564F`)** : couleur institutionnelle et des boutons principaux.
  - **Vert Vif Accent (`#10B981`)** : indicateurs de santé positive et états actifs.
  - **Rouge Alerte (`#EF4444`)** : notifications de maladies et interventions urgentes.
  - **Jaune/Ambre (`#F59E0B`)** : plantes à surveiller.
- **Icônes :** [Lucide React](https://lucide.dev/) (icônes modernes, légères et modulaires).
- **Typographie :** *Plus Jakarta Sans* via Google Fonts.

---

## 📁 3. Architecture du Code

```text
PhytoScan/
├── README.md                          # Documentation globale du projet
└── frontEnd/
    ├── images/
    │   └── scan.jpeg                  # Maquette originale fournie
    ├── src/
    │   ├── types/
    │   │   └── index.ts               # Définitions TypeScript (Plant, HealthStatus, Alert...)
    │   ├── data/
    │   │   └── mockData.ts            # Données réalistes de test (plantes, maladies, langues)
    │   ├── context/
    │   │   └── AppContext.tsx         # Gestion de l'état global et navigation inter-écrans
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Header.tsx         # Barre de statut OS mobile + Logo + Bouton Retour
    │   │   │   └── BottomNav.tsx      # Barre de navigation inférieure avec badges
    │   │   └── screens/
    │   │       ├── ScanScreen.tsx           # Écran 1 : Scanner & Diagnostic IA
    │   │       ├── PlantFolderScreen.tsx    # Écran 2 : Dossier numérique des plantes
    │   │       └── VoiceAssistantScreen.tsx # Écran 3 : Assistant vocal, langues & alertes
    │   ├── App.tsx                    # Conteneur principal avec switcher de vue
    │   ├── index.css                  # Directives Tailwind et animations sonores
    │   └── main.tsx                   # Point d'entrée React
    ├── tailwind.config.js             # Configuration du thème graphique
    ├── vite.config.ts
    └── package.json
```

---

## 📱 4. Détail des Écrans & Fonctionnalités Réalisées

### Écran 1 : Détection des maladies par l'IA (`ScanScreen.tsx`)
- **Viseur caméra réaliste :** coins de ciblage blancs `[ ]` au-dessus de l'image de feuille.
- **Simulation d'analyse IA en direct :** bouton *"Nouvelle analyse"* déclenchant une barre de progression de 0 à 100% avec loader rotatif.
- **Carte Résultat IA :**
  - Titre avec pastille de validation : *"Résultat de l'IA"*.
  - Badge rouge : *"Maladie détectée >"*.
  - Pathologie identifiée : *"Tache foliaire (Cercospora)"*.
- **Comparaison visuelle :** deux vignettes côte-à-côte avec badges de diagnostic (*Plante saine* vs *Plante malade*).
- **Liaisons interactives :**
  - Clic sur le résultat $\rightarrow$ bascule vers la fiche de la plante dans l'Écran 2.
  - Bouton pour demander conseil à l'assistant IA $\rightarrow$ ouvre l'Écran 3.

### Écran 2 : Dossier numérique des plantes (`PlantFolderScreen.tsx`)
- **Moteur de recherche & filtre :** filtrage en temps réel par nom ou par espèce.
- **Carrousel horizontal des plantes :**
  - Plante 1 (🟢 Saine - Tomate)
  - Plante 2 (🟡 À surveiller - Piment)
  - Plante 3 (🔴 Malade - Aubergine)
- **Fiche détaillée interactive :** sélection dynamique d'une plante affichant sa photo, son ID (`P-001`), et un système à 4 onglets :
  - **Détails :** Espèce, stade de croissance, date de plantation, date de dernière observation.
  - **Historique :** Chronologie des contrôles de santé.
  - **Soins :** Conseils d'arrosage, taille et engrais.
  - **Observations :** Diagnostics et notes de terrain.
- **Liaisons interactives :**
  - Bouton *"Consulter l'IA pour cette plante"* $\rightarrow$ bascule vers l'assistant vocal avec contexte.
  - Raccourci pour relancer un scan sur une nouvelle plante.

### Écran 3 : Assistant vocal et alertes (`VoiceAssistantScreen.tsx`)
- **Chat interactif :** bulles utilisateur (vert foncé) et réponses de l'IA (vert clair avec avatar feuille).
- **Sélecteur trilingue instantané :**
  - 🇫🇷 **Français**
  - 🇸🇳 **Wolof** *(ex: "Gàncax 2 bi dafa tàmbalee tàbbi féebar. Dama lay digal nga gaaw koo faj...")*
  - 🇬🇧 **English**
- **Microphone et onde sonore animée :** simulation d'enregistrement vocal lors de l'appui sur le micro.
- **Synthèse vocale (Web Speech API) :** possibilité d'écouter les réponses de l'IA à voix haute.
- **Carte d'alerte urgente :** notification de traitement urgent avec lien direct vers la plante malade concernée.

---

## 🔄 5. Flux de Connexion Inter-Écrans (State Management)

Toutes les interactions sont coordonnées via un contexte global (`AppContext`) :
- **Pile de navigation (`goBack`) :** le bouton flèche gauche `<` dans l'en-tête permet de revenir à l'écran précédent depuis n'importe où.
- **Passage de paramètres :** un clic sur une alerte de traitement dans l'Écran 3 redirige directement vers l'Écran 2 avec la plante ciblée déjà sélectionnée.
- **Ajout au carnet :** un nouveau scan peut créer une nouvelle entrée dans le dossier des plantes.

---

## 🚀 6. Guide de Démarrage Rapide

Pour lancer le projet sur votre ordinateur :

```bash
# 1. Se positionner dans le dossier frontend
cd frontEnd

# 2. Installer les dépendances (si ce n'est pas déjà fait)
npm install

# 3. Lancer le serveur de développement Vite
npm run dev
```

L'application sera accessible sur : **`http://localhost:5174/`** (ou `5173`).

### Commandes utiles
- `npm run build` : vérifie la compilation TypeScript et génère le bundle de production optimisé.
- `npm run preview` : teste le bundle de production en local.
