# Challenge back-end

## Déroulement

Le challenge back-end se déroule en 2 étapes :

- partie maison du challenge
- partie "restitution" / discussion

### Préparation

#### Objectifs

Un premier POC d'application a été réalisé, et le fonctionnel a été validé. Maintenant, nous souhaitons faire évoluer cette application dans le but de la déployer en production.

Votre mission sera de faire évoluer la codebase back.

L'API est plus en avance en terme de fonctionnalités que le site.
Ont été ajoutés :

- La pagination des tâches
- Une recherche textuelle sur le titre des tâches
- Les permissions sur les tâches

Cependant, ces améliorations sont encore à perfectionner. Cela sera votre objectif ici.

#### Déroulement

Votre premier objectif est de vous approprier la codebase existante. Libre à vous de le faire comme vous le souhaitez.

Dans un second temps, vous devrez remettre la codebase au niveau de vos standards. Actuellement, l'application est très simple, et a été codée intuitivement. Le type de modification que vous souhaitez apporter est libre : performances, typage, ...

Dans un troisième temps, vous ajoutez les fonctionnalités suivantes :

- wrapper le retour de la liste de tâches dans un objet pour inclure le compte total de tâches, pour aider à la pagination
- application des permissions sur les tâches lors des différentes opérations
- ajout d'opérations en masse : création, modification, suppression

#### Durée

La durée conseillée à y consacrer est de **2 heures**.

#### Rendu

Vous pouvez directement faire un fork de ce repository, qui sera à nous envoyer à `gerald@qualineo.io`. Si il s'agit d'un repository privé, vous pouvez le partager à `@GeraldGallet` sur GitHub aussi.

Nous vous conseillons de rédiger en amont les étapes de votre raisonnement dans le `README.md`, qui sera lu avant la restitution, pour nous donner la meilleure compréhension possible de votre rendu.

### Restitution

A la suite de cela, nous aurons un entretien d'une durée d'une heure.

Le premier objectif est de faire connaissance, et ensuite, de discuter de tous les changements apportés à la codebase ensemble.

La durée conseillée est de 2 heures afin de nous laisser aussi le temps de discuter de la suite de ce qui aurait pu être fait sur cette codebase. Si il vous reste des choses à faire après les deux heures, ça n'est pas élminatoire, notre objectif n'est pas d'évaluer la quantité de modifications apportées, mais d'évaluer la démarche avec laquelle vous avez appréhendé cette codebase.
