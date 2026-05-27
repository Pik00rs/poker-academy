# Poker Academy

App web pour apprendre le poker à partir de zéro. Multilingue (FR / EN / TH), avec leçons interactives, exercices notés et progression sauvegardée localement.

## Lancer l'app

L'app utilise des modules ES6, donc elle doit être servie par un serveur HTTP (ouvrir `index.html` en `file://` directement ne marchera pas).

### Option 1 — Python (le plus simple)

```bash
cd poker-academy
python3 -m http.server 8000
```

Puis ouvre `http://localhost:8000` dans le navigateur.

### Option 2 — Node

```bash
cd poker-academy
npx serve .
```

### Option 3 — VS Code

Installe l'extension **Live Server**, clic droit sur `index.html` → "Open with Live Server".

## Structure

```
poker-academy/
├── index.html              # Page principale
├── css/
│   ├── base.css            # Variables, reset, typo
│   ├── layout.css          # Header, nav, footer
│   ├── components.css      # Boutons, cartes, table
│   └── lessons.css         # Spécifique aux écrans de cours
└── js/
    ├── main.js             # Point d'entrée
    ├── router.js           # Routeur hash-based
    ├── poker.js            # Évaluation des mains de poker
    ├── storage.js          # localStorage (progression)
    ├── dom.js              # Helpers DOM
    ├── i18n/               # Traductions FR / EN / TH
    ├── data/lessons.js     # Contenu des 7 leçons
    ├── views/              # Écrans : accueil, leçons, exercice, progression
    ├── exercises/          # 5 types d'exercices
    └── components/         # Table de poker
```

## Les 7 leçons

1. **Positions** — ordre des sièges depuis le bouton
2. **Actions** — fold, check, call, bet, raise, all-in
3. **Pot & Stack** — SPR et engagement
4. **Lire sa main** — nommer la combinaison de 5 cartes
5. **Force des mains** — classer 5 mains par puissance
6. **Tirages** — flush draw, straight draw, outs
7. **Bet sizing** — choisir une taille de mise

## Données stockées

Toute la progression est dans `localStorage` sous la clé `pa.progress.v1` (et `pa.lang` pour la langue). Rien ne quitte le navigateur. Bouton "Réinitialiser" disponible dans l'onglet Progression.
