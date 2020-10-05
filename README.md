![University of Alberta Library](docs/UofALibrary.jpg)

CanLink is an initiative to increase the discoverability of Canadian theses and dissertations by leveraging the power of linked data to surface unexpected connections and relationships.
The initial proof of concept was developed as part of the Canadian Linked Data Initiative.
The current initiative has built on this work and is maintained and developed by the University of Alberta Library.

## Structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  The 'start' and 'build' scripts described further below are standard create-react-app scripts.  

The app is a so-called SPA (single page app) which means it loads into the browser on initial page load of index.html.  In other words, the entire site is loaded all at once.  Navigation between page is handled within the browser (using react-router).

The app handles searching by making XHR calls from the react app to SOLR running on the server.  All the query params and the SOLR server URL are defined in src/constants/index.js.

## Setting up a Development Environment

To setup your development environment follow the steps at [Create React App](https://create-react-app.dev) 

Basically, though, install node, clone this repository to your computer, run ``npm install`` and then ``npm start``

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Deploying to the CanLink Server

Run the build script then copy the contents of that directory to the directory on the server (talk to Danoosh about location)

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More About Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## CanLink Project Docs

[Design for new screens](https://drive.google.com/file/d/1gsIiCqvR3kt8DLpLdquqFZTwuN43hXzV/view)

[Overview of current CanLink project](https://docs.google.com/document/d/15T8j8zr6ntBbpHhcsqA15frGLpIhR90sz5vme1U8l0c/edit#)

[The python (Django framework) code that runs on the server,that we hopefully don’t have to deal with](https://github.com/ualbertalib/metadata/tree/CanLink/scripts/canlink-data/code)

A survey of visualizations the desginer (Carlos) suggests:

[Visualization Widgets](https://docs.google.com/spreadsheets/d/1AVSWy4_FZgnBmsnccWEOUgdVMmIJuMaLeW28wqX8Uzk/edit?ts=5ef65707#gid=0)
