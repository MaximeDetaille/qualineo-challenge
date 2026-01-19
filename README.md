# MqChallenges

## Mise en place

### Prérequis

- node
- npm

### Commandes

```bash
> npm install
```

Installer les dépandences du projet.

```bash
> npm run start:api
```

Démarrer l'API NestJS sur le port 3000.

```bash
> npm run start:site
```

Démarrer le front sur le port 4200.

```bash
> npm run test:api
```

Lancer les tests E2E de l'API.

## Codebase

Cette codebase est basée sur la stack technique principale de Qualineo.

Pour rendre la chose plus lisible, la codebase a été simplifiée et réduite à une seule fonctionnalité : une application de gestion de tâches. On s'est aussi concentré sur les technologies pré-dominantes dans cette stack: NestJS pour créer une Rest API, et React pour une application front.

### Front

Ici, le framework principal est React.
On dispose uniquement d'un contexte permettant de passer de mode jour à mode nuit, d'un layout, et de 3 pages.

### Back

Le framework principal est NestJS.

Pour la base de données, on utilise le package `typeorm`, avec une base de données `SQLite`, permettant de rendre l'exécution du challenge possible sans installations supplémentaires. Quelques données sont déjà fournies.

## Challenges

- [Instructions du challenge back-end](./back.md)
- [Instructions du challenge front-end](./front.md)
