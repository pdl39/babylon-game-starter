# Babylonjs Game Starter

## *A basic starting point for your Babylonjs Game Project, built on Webpack, Express.js.*

<br/>

### This project assumes you will use

- TypeScript for the game logic
- JavaScript for Express.js server code.

<br/>

## Getting Started

Initiate your project by running below command in the directory of your choice:
<br/>
(Replace 'my-app' with your choice of project name)

```
npx babylonjs-game-starter my-app
```

- This will:
  - download all necessary files and folders,
  - generate package.json
  - initialize git

Then, make sure to install dependencies:

```
npm install
```

Then, compile typescipt files by running:

```
npx tsc
```

Or you can install TypeScript globally to use the global `tsc` command.

```
npm i -g typescript
```

```
tsc
```

To start the development server, run:

```
npm start
```
- This will run two different scripts:
  - `webpack serve --config webpack.dev.js`
  - `nodemon server/server.js`
- Development server has been designed to run two separate servers:
  - Webpack Dev Server for frontend (at PORT 3030)
  - Express Server for backend APIs (at PORT 8080)
- Other scripts are also included for starting the server (e.g. `npm run start:dev2`, which uses `webpack-dev-middleware`), but hot reload does not work with these.
- Using `npm start` is recommended.
- To adjust ports and other settings/logic, please configure accordingly.

To build your project for production, run:

```
npm run build
```

<br/>

## Notes of Configuration
If you decide to change certain property names and values in `package.json` (e.g. `main, html, fallback, favicon, etc.`) or change the name/location of the main project file (which is set to `game/index.ts`), please make sure to update the relevant configurations in webpack accordingly.

<br/>

## Requirements:
(as of 2021.08.18)
- *LTS versions of node & npm*
  - node ~v.14.17.5
  - npm ~v.6.14.14
  - Other versions of node & npm have not yet been tested other than v.15.4.0, which is known to fail.
  - Using LTS version is recommended.

<br/>

## Current Known Issues
(as of 2021.08.18):
- *Install fails on node v.15.4.0*
  - Other variations of v15 have not been tested

<br/>

## Issues
If you find any new bugs/errors, please file issues at:
https://github.com/pdl39/babylonjs-game-starter/issues

<br/>

## Thanks!
## Happy Coding :)
