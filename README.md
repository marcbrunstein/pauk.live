# Site de Pauk

Site statique : ouvrir `index.html` ou lancer un serveur HTTP dans ce dossier.
Aucune installation ni compilation nécessaire. Les chemins relatifs fonctionnent sur GitHub Pages (`/pauk.paris/`) et avec un nom de domaine.

## Mettre à jour les dates

Modifier uniquement `assets/contenu.js`. L’accueil et la page Sur scène utilisent le même agenda.
Ajouter chaque date confirmée dans `dates`, avec `date` (AAAA-MM-JJ), `titre`, `lieu`, `role` et `url` de réservation. Les dates sont triées automatiquement et disparaissent après leur dernière journée, heure de Paris. Pour une série, ajouter `fin` et `libelle`.

Exemple (à remplacer par une date réellement confirmée) :
```js
window.PAUK = {
  dates: [
    { date: "2026-12-14", titre: "Poulet Comedy Club", lieu: "Chez Agnès, Pantin", role: "Stand-up · MC", url: "https://votre-billetterie.fr" }
  ]
};
```

La récurrence « un lundi sur deux » n’est pas transformée en dates sans calendrier confirmé. Les anciennes programmations du site ont été retirées de l’agenda en attente de sa mise à jour.

## Autres contenus

- `index.html` : accueil ; `sur-scene.html` : spectacles et Poulet Comedy Club.
- `videos.html` : sélection de vidéos ; `presse.html` : médias, biographies et photos.
- `enseignement.html` : cours particuliers et ateliers ; `contact.html` : contact.
- `assets/img/` : images web ; `assets/img/hd/` : originaux disponibles.
- `assets/style.css` : présentation commune.

## Compléments attendus

Dates confirmées ; rôle exact auprès de la Fémis ; nouvelles photos et crédits ; validation de l’adresse de contact et du domaine. Le lieu du premier spectacle n’est pas précisé dans la nouvelle présentation, les sources mentionnant Le Lieu et Le Bout.

Les liens vidéo et médias ajoutés proviennent du dossier de candidature fourni. Le lien France Info et le profil Superprof ont été confirmés par Pauk. Les avis de Camille et Baptiste ont été retranscrits depuis ses captures, avec attribution et dates. Les nouvelles photos ont été fournies dans la seconde archive ; les crédits photographiques restent à préciser. Les notes de travail et coordonnées de prospection ne sont pas publiées.

## Publication

L’hébergement existant est GitHub Pages : `https://marcbrunstein.github.io/pauk.paris/`.
Après validation, enregistrer puis pousser les changements dans la branche configurée pour Pages. Aucun changement d’hébergeur requis.

## Parcours professionnel et vidéo

`professionnels.html` rassemble les informations de programmation, les références, le contact, les ressources presse et une fiche imprimable ou enregistrable en PDF depuis le navigateur. `videos.html#scene` rassemble les passages télé et les chansons improvisées.

## Mise à jour de la saison 2026–2027

16 dates à venir du Poulet et 7 autres rendez-vous sont renseignés dans `assets/contenu.js`, d’après l’affiche fournie, les lundis à 20 h 15 chez Agnès, 21 rue Delizy à Pantin. L’accueil propose un calendrier mensuel cliquable ; la page Sur scène affiche dix dates à venir et permet de déplier la suite. Les cinq dates passées du Poulet ont été retirées le 14 novembre 2026. Les dates qui passent sont ensuite masquées automatiquement. Les adresses des salles sont cliquables vers leur carte.

Deux vidéos locales validées, chargées au clic, figurent sur la page Vidéos. Les photos sélectionnées conservent leurs proportions et les originaux sont disponibles dans la galerie. La vignette Comédie+ est désormais la photo officielle de l’épisode 6, récupérée sur Canal+, sans génération ni modification des visages. La référence sur le roast pointe vers l’article franceinfo fourni.

## Domaine choisi

Domaine principal : https://pauk.live/ ; contact public : contact@pauk.live. La configuration DNS et l’activation de la boîte mail se font dans OVH. Le dépôt et l’adresse de prévisualisation GitHub Pages restent inchangés.

## Statistiques sociales

`assets/statistiques.js` contient les abonnés par réseau, les vues des vidéos épinglées et la date de relevé. Le total se recalcule à partir des quatre nombres. Les chiffres constituent un relevé daté, pas une synchronisation automatique avec les plateformes. Les vues abrégées sont marquées approximatives ; aucun nombre manquant n’est inventé.


Sources des lieux (vérifiées le 14 novembre 2026) :
- Le Charleston : https://www.le-charleston.fr/
- Studio Galande et horaire du 19 novembre : https://www.helloasso.com/associations/look-both-ways/evenements/festival-de-nouvelle-comedie-2026
- Le QG 18 : https://www.billetreduc.com/spectacle/le-beau-comedy-club-stand-up-a-paris-18e-414854 (20 h confirmé par Pauk)
- Boulette chez Jeannine : https://www.privateaser.com/lieu/53005-jeannine
- Vierge au Mondial : https://shotgun.live/nl/events/vierge-comedy-club
- Gavé Style / Drôle de Scène : https://www.gavestyle.fr/pages/contact.html

- Le Méliès : https://www.meliesmontreuil.fr/ — Rire et Lire corrigé au 21 novembre 2026, de 18 h à 20 h 30, sur confirmation de Pauk. Les lieux Boulette / Jeannine et Vierge / Le Mondial sont confirmés par Pauk.


Accueil allégé : descriptions répétées supprimées. Le calendrier utilise le même agenda que la page Sur scène ; un clic sur un jour coloré affiche les représentations, les adresses et les réservations disponibles. Navigation bornée de la première à la dernière date future, sélection utilisable au clavier.
Le Poulet Comedy Club est co-organisé par Pauk et Madame Hutt ; la photo d’anniversaire avec Jeanne fournie par Pauk remplace le portrait dans cette section. Titre de saison : « Lundi, c’est Poulet ! ».

Mise en scène : référence Bon camarade d’Arthur Fournier ajoutée aux pages Enseignement et Professionnels, avec la billetterie fournie par Pauk. Rythme du mardi à Paris et deux saisons à Avignon confirmés par Pauk.

Presse & bio : parcours de jeu et de mise en scène à Avignon en 2025 et 2026 précisé sur indication de Pauk (scène ouverte d’improvisation chantée en 2025 et Le Prime de la FMR Académie en 2026), avec le lien https://www.ticketac.com/spectacles/fmr-academie.

Ton éditorial : Pauk parle à la première personne et tutoie le visiteur. Titres et appels à l’action à l’impératif quand ils s’y prêtent. Les biographies à reprendre par la presse, les noms des œuvres, les témoignages et les mentions légales conservent leur formulation factuelle.

Page Sur scène : agenda placé en premier, dix dates à venir par défaut et bouton pour afficher ou replier toutes les dates, puis Poulet Comedy Club, Merci pour l’attention, affiche de saison et L’Art de Rater.

Le lien des chansons improvisées pointe vers https://youtu.be/r4fRx24oTAk. L’ancien extrait de quinze minutes a été retiré des pages et des ressources professionnelles à la demande de Pauk.
