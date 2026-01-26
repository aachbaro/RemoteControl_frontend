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
