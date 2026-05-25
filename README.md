# 🎟️ SugarRush Frontend

Frontend mobile du projet **SugarRush** développé avec **React Native** et **Expo**.

L’application permet :

- l’authentification des utilisateurs
- l’achat de billets
- la gestion des cartes de paiement
- l’affichage des horaires du train
- la gestion du portefeuille utilisateur
- l’accès au profil utilisateur
- la gestion des achats et QR codes

---

# 📱 Technologies utilisées

## Frontend

- React Native
- Expo
- React Navigation
- Axios
- Expo Linear Gradient
- Ionicons

---

# 🧪 Tests unitaires

Le projet utilise :

- Jest
- Jest Expo
- React Native Testing Library

---

# 📂 Structure du projet

```txt
src/
│
├── components/
├── context/
├── navigation/
├── screens/
├── services/
├── styles/
├── utils/
│
_tests_/
│
├── context/
├── screens/
└── services/
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone <url-du-repo>
```

---

## 2. Aller dans le dossier

```bash
cd SugarRush_Frontend
```

---

## 3. Installer les dépendances

```bash
npm install
```

---

# ▶️ Lancer le projet

## Expo

```bash
npx expo start
```

---

# 🧪 Lancer les tests

## Tous les tests

```bash
npm test
```

---

# 📊 Coverage des tests

## Générer le coverage

```bash
npm run test:coverage
```

---

# ✅ Résultat actuel du coverage

```txt
All files
Statements : 80.73%
Branches   : 67.02%
Functions  : 76.08%
Lines      : 84.4%
```

---

# 📂 Structure des tests

```txt
_tests_
│
├── context
│   └── AuthContext.test.js
│
├── screens
│   ├── HomeScreen.test.js
│   ├── LoginScreen.test.js
│   ├── PaymentScreen.test.js
│   ├── ProfileScreen.test.js
│   ├── SignupScreen.test.js
│   └── TicketsScreen.test.js
│
└── services
    ├── api.test.js
    └── tokenService.test.js
```

---

# 🔐 Fonctionnalités testées

# ✅ Authentification

## AuthContext

Tests réalisés :

- restauration de session
- connexion utilisateur
- déconnexion utilisateur
- inscription utilisateur
- refresh utilisateur
- récupération du portefeuille
- sauvegarde du token
- suppression du token
- gestion des erreurs API

---

## LoginScreen

Tests réalisés :

- affichage du formulaire
- validation des champs
- erreurs si champs vides
- appel de login()
- navigation vers Signup

---

## SignupScreen

Tests réalisés :

- validation email
- validation mot de passe
- validation téléphone
- validation username
- validation adresse
- erreurs backend
- inscription utilisateur
- connexion automatique après inscription

---

# 🎫 Gestion des billets

## TicketsScreen

Tests réalisés :

- affichage des billets
- calcul du prix total
- augmentation quantité
- diminution quantité
- achat de billet
- sélection des cartes
- redirection vers paiement
- gestion absence de carte
- affichage toast succès
- affichage toast erreur

---

# 💳 Gestion des paiements

## PaymentScreen

Tests réalisés :

- affichage des cartes
- ajout de carte
- suppression de carte
- validation numéro carte
- validation CVV
- validation date expiration
- validation nom
- carte déjà existante
- ouverture/fermeture modal

---

# 👤 Gestion du profil

## ProfileScreen

Tests réalisés :

- affichage des informations utilisateur
- portefeuille utilisateur
- historique des achats
- navigation QR code
- navigation paiement
- navigation admin
- refresh utilisateur
- déconnexion

---

# 🚆 Gestion des horaires

## HomeScreen

Tests réalisés :

- chargement des horaires
- affichage du train
- train hors ligne
- train en pause
- train en route
- horaires vides
- données API

---

# 🔧 Services testés

## api.jsx

Tests réalisés :

- request interceptor
- response interceptor
- ajout automatique du token
- gestion des erreurs API

---

## tokenService.jsx

Tests réalisés :

- saveToken()
- getToken()
- clearToken()

---

# 🛠️ Commandes utiles

## Installer dépendances

```bash
npm install
```

---

## Lancer tests

```bash
npm test
```

---

## Coverage

```bash
npm run test:coverage
```

---

## Nettoyer cache Jest

```bash
npx jest --clearCache
```

---



# 📦 Dépendances principales

```json
{
  "react": "...",
  "react-native": "...",
  "expo": "...",
  "jest": "...",
  "@testing-library/react-native": "...",
  "axios": "...",
  "@react-navigation/native": "..."
}
```

---

# 🎯 Objectif atteint

✅ Plus de 80% de couverture globale

Le projet couvre les fonctionnalités critiques :

- Authentification
- Paiements
- Billets
- Profil utilisateur
- Horaires
- API
- Gestion des tokens

