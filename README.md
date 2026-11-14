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

`professionnels.html` rassemble les informations de programmation, les références, le contact, les ressources presse et une fiche imprimable ou enregistrable en PDF depuis le navigateur. `videos.html#scene` propose un lecteur YouTube activé au clic, sans lecture automatique. Un extrait court de 30 à 60 secondes pourra remplacer ou compléter le passage long lorsqu’il aura été sélectionné et validé par Pauk.

## Mise à jour de la saison 2026–2027

21 dates du Poulet sont renseignées dans `assets/contenu.js`, d’après l’affiche fournie, les lundis à 20 h 15 chez Agnès, 21 rue Delizy à Pantin. L’accueil affiche les quatre prochaines ; la page Sur scène affiche toutes les dates à venir. Les dates passées restent dans les données et sont masquées automatiquement.

Deux vidéos locales validées, chargées au clic, figurent sur la page Vidéos. Les photos sélectionnées conservent leurs proportions et les originaux sont disponibles dans la galerie. La vignette Comédie+ est désormais la photo officielle de l’épisode 6, récupérée sur Canal+, sans génération ni modification des visages. La référence sur le roast pointe vers l’article franceinfo fourni.
