🏃 Club Sport Toulouse

Application web permettant de rechercher et visualiser les clubs sportifs de la métropole de Toulouse sur une carte interactive.

Les données proviennent de l’Open Data de Toulouse Métropole.

🚀 Fonctionnalités


🔍 Recherche de clubs sportifs

🗺️ Carte interactive avec Leaflet

📍 Géolocalisation des clubs

🎯 Filtres dynamiques :

Ville (Toulouse)

Discipline sportive

Accessibilité handicap

📊 Nombre de résultats en temps réel

🖱️ Interaction carte ↔ liste :

Clic sur un club → zoom sur la carte

Popup avec informations

🛠️ Technologies utilisées

HTML5

CSS3

JavaScript (Vanilla JS)

Leaflet

API Open Data Toulouse Métropole

🌐 Source des données

API utilisée :

https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/annuaire-des-associations-et-clubs-sportifs/records

⚙️ Installation

1. Cloner le projet
   
git clone https://github.com/ton-username/club-sport-toulouse.git

cd club-sport-toulouse

3. Lancer le projet

👉 Ouvrir simplement le fichier index.html dans le navigateur

OU avec un serveur local (recommandé) :

python -m http.server

Puis ouvrir :
👉 http://localhost:8000

📁 Structure du projet
.
├── index.html
├── app.js
├── styles.css


🧠 Fonctionnement


🔄 Chargement des données

Récupération des clubs via l’API Open Data

Stockage dans une variable globale clubs

🎛️ Filtres

Génération automatique des filtres (communes + disciplines)

Filtrage dynamique côté client

🗺️ Carte

Initialisation centrée sur Toulouse

Ajout de marqueurs personnalisés

Popups avec informations du club

📋 Liste des clubs

Affichage dynamique

Interaction avec la carte (focus + sélection)

✨ Améliorations possibles

Pagination des résultats

Recherche par mot-clé

Géolocalisation utilisateur

Responsive mobile amélioré

Mise en cache des données

Ajout d’un backend (Flask / Symfony)

👩‍💻 Auteur

Projet réalisé par Stéphanie, dans le cadre d’un apprentissage du développement web et de la manipulation d’API.

🔗 Démo

👉 (à ajouter si tu déploies sur GitHub Pages ou autre)

💡 Remarque

Ce projet utilise des données publiques, susceptibles d’évoluer selon les mises à jour de l’API.
