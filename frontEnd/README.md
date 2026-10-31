# 🌿 PhytoScan AI - Documentation Frontend & Guide de Navigation

## 📖 Sommaire
1. [Présentation du projet](#-présentation-du-projet)
2. [Flux de Navigation Inter-Écrans](#-flux-de-navigation-inter-écrans)
3. [Détail des Écrans](#-détail-des-écrans)
4. [Gestion de l'État Global (AppContext)](#-gestion-de-létat-global-appcontext)
5. [Lancement et Commandes](#-lancement-et-commandes)

---

## 🌾 Présentation du Projet

PhytoScan AI est une solution d'agriculture de précision pensée pour les producteurs agricoles. Elle permet :
- Le diagnostic instantané des maladies foliaires par intelligence artificielle.
- La gestion et le suivi de santé des plantes via un carnet numérique.
- Le conseil agronomique vocal accessible en **Français**, **Wolof** et **Anglais**.

---

## 🔄 Flux de Navigation Inter-Écrans

L'application est totalement connectée via `AppContext` :

```
┌──────────────────────────┐             ┌──────────────────────────┐
│   ÉCRAN 1 : SCAN IA      │             │ ÉCRAN 2 : DOSSIER PLANTES│
│                          │             │                          │
│ • Carte Résultat         ├────────────►│ • Affiche la fiche de    │
│ • Bouton "Ajouter dossier"│             │   la plante scannée      │
│                          │             │                          │
│ • Bouton "Demander       │             │ • Bouton "Poser une      │
│   conseil à l'IA"        ├──┐       ┌──┤   question sur la plante"│
└──────────────────────────┘  │       │  └──────────────────────────┘
                              │       │                ▲
                              ▼       ▼                │
                     ┌──────────────────────────┐      │
                     │ ÉCRAN 3 : ASSISTANT VOCAL│      │
                     │                          │      │
                     │ • Carte d'alerte rouge   ├──────┘
                     │   (Clic ➔ Ouvre la fiche │
                     │    de la Plante 2)       │
                     └──────────────────────────┘
```

1. **Scan ➔ Dossier :** 
   - Un clic sur la carte de diagnostic (*Tache foliaire*) ou sur le bouton *"Ajouter au dossier"* bascule vers le dossier et met en valeur la plante concernée.
2. **Scan ➔ Assistant :**
   - Le bouton *"Demander conseil"* bascule vers l'assistant vocal pour obtenir la conduite à tenir.
3. **Dossier ➔ Assistant :**
   - Sur n'importe quelle fiche de plante, l'icône de message permet d'ouvrir l'assistant en gardant le sujet de la plante en mémoire.
4. **Assistant ➔ Dossier :**
   - Cliquer sur la carte d'alerte rouge en bas de l'assistant ouvre immédiatement la fiche de la plante malade (*Plante 2*).
5. **Bouton Retour `<` universel :**
   - Géré par une pile d'historique de navigation pour revenir en arrière à tout moment.

---

## 🔌 Couche d'Intégration API (`src/services/api.ts`)

Pour faciliter la collaboration avec votre équipe backend :
- **Fichier `src/services/api.ts` :** centralise tous les appels REST (`analyzeLeafImage`, `fetchPlants`, `savePlantRecord`, `queryAssistant`).
- **Interrupteur `USE_MOCK` :** permet de travailler en mode simulation locale tant que le backend n'est pas lancé. Dès que le backend est prêt, mettez `USE_MOCK = false` (ou `VITE_USE_MOCK=false` dans votre `.env`).
- **Fichier `.env.example` :** modèle de configuration pour spécifier l'URL du backend (`VITE_API_URL=http://localhost:8000/api`).

---

## 📱 Détail des Écrans

- **[ScanScreen.tsx](file:///home/modou-niane/PhytoScan/frontEnd/src/components/screens/ScanScreen.tsx) :** Viseur caméra, animation d'analyse en direct, badge maladie, comparaison visuelle, ajout au carnet.
- **[PlantFolderScreen.tsx](file:///home/modou-niane/PhytoScan/frontEnd/src/components/screens/PlantFolderScreen.tsx) :** 
  - Moteur de recherche et filtre avancé par santé (Toutes, 🟢 Saines, 🟡 À surveiller, 🔴 Malades).
  - Carrousel horizontal interactif avec sélection dynamique et carte d'ajout rapide.
  - Système à 4 onglets opérationnels : *Détails*, *Historique*, *Soins*, *Observations*.
  - Modale d'historique complet chronologique.
  - Ajout direct de notes d'observations de terrain pour l'agriculteur.
  - Passerelle directe vers l'Écran 1 (Scanner) et l'Écran 3 (Assistant avec sujet ciblé).
- **[VoiceAssistantScreen.tsx](file:///home/modou-niane/PhytoScan/frontEnd/src/components/screens/VoiceAssistantScreen.tsx) :** Discussion trilingue (**Français, Wolof, Anglais**), animation sonore, micro interactif, synthèse vocale, alerte prioritaire.

---

## 🛠️ Lancement

```bash
npm install
npm run dev
```
Rendez-vous sur `http://localhost:5174/` !
