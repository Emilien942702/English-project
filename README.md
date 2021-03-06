[![Build Status](https://travis-ci.org/Emilien942702/English-project.svg?branch=master)](https://travis-ci.org/Emilien942702/English-project)

Repository containing the code source of [test-anglais-6c622.firebaseapp.com](https://test-anglais-6c622.firebaseapp.com/)

Documentation page : [emilien942702.github.io/English-project](https://emilien942702.github.io/English-project/)

## Overview

This repository contains the source code of the React application running using Firebase

## Installation

- Install [Node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
- `git clone https://github.com/Emilien942702/English-project && cd English-project`
- `npm install`
- `firebase login`
- Create a `.env` file at the root of the project, containing the following lines:

`REACT_APP_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

`REACT_APP_AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

`REACT_APP_DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

`REACT_APP_PROJECT_ID=XXXXXXXXXXXXXXXXXX`

`REACT_APP_STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

`REACT_APP_MESSAGING_SENDER_ID=XXXXXXXXXXX`

To obtain the keys, go [there](https://console.firebase.google.com/u/0/project/test-anglais-6c622/settings/general/) and click on the `</>` symbol to add a web application to the project

- `npm start`

## Code

The technologies used are :

- [React](https://github.com/facebook/react "React") : Javascript library made by Facebook
- [Material-UI](https://material-ui.com/ "Material-UI") : React UI framework designed to implement Google's Material rules
- [Recompose](https://github.com/acdlite/recompose "Recompose") to compose React libraries
- [Firebase](https://www.npmjs.com/package/firebase "Firebase") to connect the React application to Firebase
- [github-pages](https://pages.github.com/) for the documentation

## Hosting

The application is hosted on [Firebase](https://console.firebase.google.com/u/0/project/test-anglais-6c622/ "Firebase")

## Continuous Integration

Deployments on Firebase are made from this repository using [Travis](https://travis-ci.org/Emilien942702/English-project "Travis")

## Authentification

The application uses [Firebase authentification](https://firebase.google.com/docs/auth/ "Firebase authentification") to register an user using the following characteristics:

- Username
- Email Address
- Password

## Database

The Realtime Database stores the following tables :

- users - id : given by Firebase authentification (cf. [Authentification](#Authentification)) - email : given by Firebase authentification (cf. [Authentification](#Authentification)) - roles - 0 : can be `"ADMIN"` or `null` - username : given by Firebase authentification (cf. [Authentification](#Authentification))
- cards - id : random identifer - createdAt : Timestamp storing the date of creation - editedAt : Timestamp storing the date of edition (`null` if not edited) - recto : Text to store the recto of the card - uid : same as id - user : Linked to the `users` table - userId : ID of the user who created the card - verso : Text to store the verso of the card

## Deployment

Just make a commit to the repository, travis will do the rest !

## Available Scripts

In the project directory, you can run:

### `npm run start`

- Runs the app in the development mode.
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  The page will reload if you make edits.
  You will also see any lint errors in the console.

### `npm run build && firebase deploy`

- Creates the production build and deploy it to firebase.
  Requires to be logged in to Firebase : `firebase login`
