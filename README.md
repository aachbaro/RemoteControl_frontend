# RemoteControl Frontend

Frontend React (Vite) servant d’interface web locale pour piloter un backend Python.

## Objectif

Ce projet fournit une télécommande web minimaliste permettant de déclencher des actions sur un backend local (Django / DRF).

Le cas d’usage initial est le pilotage à distance de SampleRod :

* démarrer un enregistrement
* arrêter un enregistrement
* consulter l’état courant

Le frontend est conçu pour être accessible depuis un navigateur mobile et connecté à un backend sur le même réseau Wi-Fi.

## Philosophie pédagogique

Ce repository sert de base de référence pour :

* apprendre les fondamentaux de React
* comprendre la communication frontend ↔ backend
* documenter un setup reproductible
* construire un frontend modulaire et configurable

L’objectif n’est pas un produit fini, mais un template réutilisable.

## Architecture générale

```text
[Téléphone / Navigateur]
          |
          v
   React (Vite) — port 5173
          |
          | fetch("/api/…")
          v
     Proxy Vite
          |
          v
   Backend Django — port 8000
```

## Principes clés

* Le frontend ne connaît jamais directement l’IP du backend
* Toutes les requêtes passent par `/api/*`
* Le proxy Vite redirige vers le backend
* Aucun CORS nécessaire en développement

## Structure du repository

```text
remotecontrol-frontend/
├── README.md
├── .env.example
├── .gitignore
├── package.json
├── vite.config.ts
└── src/
    ├── api/
    │   ├── client.ts        # wrapper fetch
    │   └── recording.ts     # start / stop / status
    ├── components/
    ├── pages/
    ├── App.tsx
    └── main.tsx
```

## Configuration via variables d’environnement

Le backend ciblé est défini par variable d’environnement.

`.env.example` :

```env
VITE_BACKEND_TARGET=http://localhost:8000
```

`.env.local` (non versionné) :

```env
VITE_BACKEND_TARGET=http://<IP_DU_PC>:8000
```

## Proxy Vite (principe)

* Le frontend effectue des requêtes vers `/api/...`
* Vite intercepte `/api` et redirige vers le backend

Avantages :

* code frontend indépendant de l’URL backend
* pas de CORS en développement
* transition simple vers un build production

## Lancement en mode téléphone

Le serveur de développement doit écouter sur toutes les interfaces réseau.

* host : `0.0.0.0`
* port : `5173`

Accès depuis le réseau local :

```text
http://<IP_DU_PC>:5173
```

Accessible depuis un téléphone, une tablette ou une autre machine du réseau.

## Setup & clean initial — Frontend React (Vite)

Cette section décrit la mise en place d’un frontend React minimal, propre, accessible sur le réseau local et prêt à communiquer avec un backend via un proxy.

---

### Objectif de l’étape

* Poser un socle React sain
* Comprendre l’emplacement des fichiers clés
* Éviter les erreurs classiques (root projet, `.env`, proxy)
* Obtenir un frontend lisible et réutilisable

---

### 0. Principe fondamental

Le dossier créé par Vite **est** le projet.

Tout ce qui concerne React (Git, `.env`, config, dépendances) vit dans ce dossier, jamais au niveau parent.

Structure correcte :

```text
remotecontrol-frontend/
├── package.json
├── vite.config.ts
├── src/
├── .env.example
├── .gitignore
```

---

### 1. Pré-requis

* Node.js ≥ 18
* npm
* Terminal ouvert dans le dossier parent

Vérification :

```bash
node -v
npm -v
```

---

### 2. Création du projet React avec Vite

Depuis le dossier parent :

```bash
npm create vite@latest remotecontrol-frontend
```

Choix :

* Framework : React
* Variant : TypeScript

Installation des dépendances :

```bash
cd remotecontrol-frontend
npm install
```

---

### 3. Lancer React une première fois

```bash
npm run dev
```

Accès local :

```text
http://localhost:5173
```

---

### 4. Exposer le serveur sur le réseau local

Vite doit écouter sur toutes les interfaces réseau.

Modifier `package.json` :

```json
"scripts": {
  "dev": "vite --host 0.0.0.0 --port 5173",
  "build": "vite build",
  "preview": "vite preview"
}
```

Relancer :

```bash
npm run dev
```

Accès réseau :

```text
http://<IP_DU_PC>:5173
```

---

### 5. Gestion des variables d’environnement

#### 5.1 `.env.example` (versionné)

À la racine du projet :

```env
VITE_BACKEND_TARGET=http://localhost:8000
```

---

#### 5.2 `.env.local` (non versionné)

Créer `remotecontrol-frontend/.env.local` :

```env
VITE_BACKEND_TARGET=http://<IP_DU_PC>:8000
```

---

#### 5.3 Vérifier `.gitignore`

Le fichier doit contenir :

```text
node_modules
.env.local
dist
```

---

### 6. Configuration du proxy Vite → backend

Objectif : rediriger `/api/*` vers le backend sans CORS.

Remplacer le contenu de `vite.config.ts` :

```ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const backendTarget = env.VITE_BACKEND_TARGET;

  if (!backendTarget) {
    throw new Error("VITE_BACKEND_TARGET is not defined");
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
```

---

### 7. Nettoyage du projet par défaut

#### 7.1 Nettoyer `src/`

Supprimer les fichiers de démonstration inutiles.

Conserver :

```text
src/
├── App.tsx
├── main.tsx
└── index.css
```

---

#### 7.2 Contenu minimal de `App.tsx`

```tsx
function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>RemoteControl Frontend</h1>
      <p>Frontend prêt.</p>
    </div>
  );
}

export default App;
```

---

### 8. Préparer l’architecture API

Création des dossiers sans logique.

```bash
mkdir -p src/api
touch src/api/client.ts
touch src/api/recording.ts
```

---

### 9. Initialiser Git au bon endroit

Initialisation dans le dossier frontend.

```bash
git init
git add .
git commit -m "init: react + vite frontend setup"
```

---

### 10. État attendu

* React accessible depuis le téléphone
* Proxy `/api` fonctionnel
* `.env.example` présent
* `.env.local` ignoré par Git
* Projet nettoyé
* Structure `src/api/` prête
* Premier commit propre

