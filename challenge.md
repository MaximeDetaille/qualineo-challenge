# Analyse du projet

## Backend

- Lors de l'installation des dépendances, il y a beaucoup de vulnérabilités soulevés, il faudra les corriger.
- La partie app (app.controller, app.service) ne sert pas à grand chose si ce n'est que testé si l'api fonctionne bien (healtcheck à la limite).
- J'ai pour habitude de mettre les dtos dans un dossier histoire de les centralisé.
- Parfois il manque des dtos pour la partie task. Par exemple on pourrait créer un dto spécifique pour ça `Omit<TaskEntity, 'id'>`De cette manière on pourra le réutiliser mais aussi faciliter son évolution.
- On pourrait rajouter un swagger aussi de manière a construire une doc api fiable. On pourrait par la suite utiliser le swagger.json pour générer automatiquement un client frontend.
- Rajouter du fuzzy sur la partie search pour matcher les fautes d'orthographes.

## Frontend

- Pareil que pour le backend, il faudra mettre à jour les dépendances.
- Webpack un peu vieux, ne faudrait-it pas passer sur un autre bundler ? (Vite, Bun)
- Au premier lancement de l'application, je trouve qu'il y a des soucis UX. Par exemple j'ai tout de suite confondu la search et la partie add, les deux parties sont trop proches.
- Coté frontend, la bonne pratique c'est plutot de mettre les valeurs filtrés dans l'url afin de pouvoir partager facilement les urls. De plus on peu se servir de ca aussi pour faire un push history pour récupérer les valeurs filtrés précedentes.
- Découper un maximum les sous-composant qui se répéte.
- On pourrait rajouter des skeletton pour faire en sorte d'habiller la réponse serveur.
- On pourrait mettre un debounce sur la partie search pour éviter de trop requêter le serveur (sur chaque lettre)
- Contruire un client api à l'aide du swagger back (des libs existent OpenApiFetch, swagger-typescript-api).

## Taches

- [x] wrapper le retour de la liste de tâches dans un objet pour inclure le compte total de tâches, pour aider à la pagination
- [x] application des permissions sur les tâches lors des différentes opérations
- [/] ajout d'opérations en masse : création, modification, suppression -> Suppression en masse faites, je n'ai pas eu le temps de faire les autres.

## Déroulé

Je ne me suis pas focus sur le backend ou le frontend, j'ai jongler un peu avec les deux au fur et à mesure que j'ai découvert le projet ^^.

Je vais résumer au maxium étapes par étapes comment j'ai procédé.

1. La méthode de search
- J'ai d'abord observé que coté front le search venait juste appliquer un filter sur la liste des tasks. Cela fonctionne très bien dès lors qu'on utilise pas de la pagination. Si on a de la pagination on aura qu'un scope réduit de tasks donc on filtrera sur ceux la mais pas sur toutes les tasks de la db. Il faut donc envoyer le terme au back pour que ce soit lui qui gère cette partie.
- Coté backend, la méthode était déjà créer donc rien de spécial a faire de ce coté.

2. La pagination
- Coté back il y avait déjà de la pagination de faites, il manquait cependant le nombre de tasks au total pour l'afficher coté front.
- Coté front j'ai donc créer plusieurs petits composants. Deux composant bouton (prev et next) pour naviguer entre les pages. J'ai bien fais attention à disabled le bouton si la page suivante ou précédente n'est pas accessible. Et j'ai fais un composant pour gérer le nombre de résultats par page et un récap pour voir sur quelle page nous sommes et combien de pages au total il existe.
- J'ai créer du coup deux méthode coté front pour handle la pagination.
- J'ai aussi créer un useEffect avec comme listener la current page, de manière a reload automatiquement dès qu'on change de page.
- J'ai du coup sorti la méthode load pour pouvoir la réutiliser et je lui ai passé mes nouveaux paramètres (take, skip).

3. La gestion des permissions
- Les boutons update / delete et l'update en done étaient déjà présent et bien branché au backend.
- Coté backend j'ai du rajouter une petite couche de vérification voir si la tâche avait le droit d'être supprimée. Pour cela je vérifie déjà si la tâche existe dans la db sinon on renvoi une 404. Si elle existe mais qu'elle n'est pas en droit d'être supprimée -> 403 ForbiddenException.
- Pour prévenir le client coté front j'ai rajouté une lib de toaster (sonner) pour l'avertir qu'il n'a pas le droit de modifier cette task. J'ai fais la même chose pour la partie update.

4. Gestion des actions en masses
- Pour les actions masse je me suis focus sur la partie suppression (le temps se faisait cours :D).
- J'ai rajouté des checkbox sur le coté des tasks pour qu'elles puissent être selectionnable. Ensuite dès lors qu'une tâche est selectionnée j'ai rajouter une barre d'action plus globale pour permettre la suppressions de toutes les tasks selectionnée.
- Pareil on oublie pas le fait que certaines tasks n'ont pas le droit d'être supprimée. Du coup je renvoie une erreur en mettant à la suite toutes les tasks touchées par la forbidden. (On aurait pu améliorer ça en renvoyant un message plus complets en objet etc, afin de quand même faire le traitement sur celles valide).

5. Refacto
- J'ai plus refacto coté frontend pour le coup. Beaucoup de séparation de composant, déplacement de la logique dans les sous composant (typiquement chaque ligne task est un composant avec ses propres méthodes).
- Je n'ai pas eu le temps mais il aurait aussi fallu harmoniser les composants. On a par exemple Ant pour certains boutons et un composant bouton codé directement dans le projet.

## Conclusion

J'ai réalisé le teste en un peu plus de 2h30 (je compte pas le temps de rédaction du doc). J'ai du retenir mon oeil de frontend pour éviter de changer tout le style / les composants de la page ahah :D
J'espère que je n'ai pas été trop précis dans ce doc mais dans tous les cas on aura encore matière à discuter !

Et désolé si il y a des fautes d'orthographes, je suis meilleur en ligne de code qu'en français :)

