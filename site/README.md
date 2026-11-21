# Refonte du site de l'Université Numérique du Gabon (proposition)

Site statique (HTML, CSS et JavaScript, sans framework), prêt à héberger.

## Concept : « Le Signal »

Le site reprend les deux formes du logo officiel, le **cercle** et les **barres verticales**, et en fait son interface :

- **Bandeau d'accueil** : les photos réelles de l'UNG apparaissent à travers les barres du logo. Les barres bougent et réagissent à la souris.
- **Chiffres** : affichés en barres qui montent du bâtiment de l'UNG.
- **Pôles** : cinq barres colorées qui s'ouvrent pour montrer les formations.
- **Moteur « Que voulez-vous devenir ? »** : l'étudiant tape un métier et le moteur propose une formation.
- **Carte IA** : relie chaque diplôme aux métiers auxquels il mène.

Couleurs, polices et logo viennent de la **charte graphique officielle** (`ung.ga/charte.pdf`) :

- bleu `#161A31` et vert `#3DB392` ;
- couleurs d'accompagnement pour les pôles ;
- polices Montserrat et Open Sans.

## Fichiers

| Chemin | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `css/style.css` | Identité visuelle |
| `js/data.js` | **Toutes les données** : formations, pôles, actualités, ENO, partenaires, photos du bandeau. Modifier ce fichier suffit. |
| `js/main.js` | Interactions |
| `img/logo-ung.png`, `img/logo-ung-blanc.png` | Logo officiel extrait en haute définition de la charte |
| `img/photos/` | Photos de l'UNG (site ung.ga), recadrées et compressées |
| `img/logos/` | Logos des partenaires |
| `img/src/` | Fichiers d'origine téléchargés (à ne pas mettre en ligne) |

## Déployer

- **Netlify** : glisser le dossier `site/` (sans `img/src`) sur https://app.netlify.com/drop
- **Vercel** : `npx vercel` dans le dossier `site/`
- **Serveur actuel de l'UNG** : copier le contenu de `site/` dans le dossier web

## Avant la mise en production

1. Photos en meilleure définition, surtout celle de l'étudiante (586 px de large aujourd'hui).
2. Relier les actualités au back-office existant (`/admin`).
3. Relier l'assistant à un modèle d'IA entraîné sur les documents de l'UNG (il répond aujourd'hui à partir d'une FAQ).
4. Faire valider par l'UNG les textes courts ajoutés sur les ENO.
