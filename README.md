# English-project

Repository containing the code source of [test-anglais-6c622.firebaseapp.com](https://test-anglais-6c622.firebaseapp.com/)

## Overview

This repository contains the source code of the React application running using Firebase

## Code
The technologies used are :
- [React](https://github.com/facebook/react "React") : Javascript library made by Facebook
- [Material-UI](https://material-ui.com/ "Material-UI") : React UI framework designed to implement Google's Material rules 
- [Recompose](https://github.com/acdlite/recompose "Recompose") to compose React libraries
- [Firebase](https://www.npmjs.com/package/firebase "Firebase") to connect the React application to Firebase

##Hosting
The application is hosted on [Firebase](https://console.firebase.google.com/u/0/project/test-anglais-6c622/ "Firebase")

##Continuous Integration
Deployments on Firebase are made from this repository using [Travis](https://travis-ci.org/Emilien942702/English-project "Travis")

##Authentification
The application uses [Firebase authentification](https://firebase.google.com/docs/auth/ "Firebase authentification") to register an user using the following characteristics:
- Username
- Email Address
- Password

##Database
The Realtime Database stores the following tables :
- users
	- id : given by Firebase authentification (cf. [Authentification](#Authentification)) 
		- email : given by Firebase authentification (cf. [Authentification](#Authentification)) 
		- roles
			- 0 : can be `"ADMIN"` or `null`
		- username : given by Firebase authentification (cf. [Authentification](#Authentification)) 
- cards
	- id : random identifer
		 - createdAt : Timestamp storing the date of creation
		 - editedAt : Timestamp storing the date of edition (`null` if not edited)
		 - recto : Text to store the recto of the card
		 - uid : same as id
		 - user : Linked to the `users` table
		 - userId : ID of the user who created the card
		 - verso : Text to store the verso of the card

##Deployment 
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
