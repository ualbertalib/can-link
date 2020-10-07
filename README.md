![University of Alberta Library](docs/UofALibrary.jpg) ![CanLink](src/images/CanLinklogo-gray.png) 

CanLink is an initiative to increase the discoverability of Canadian theses and dissertations by leveraging the power of linked data to surface unexpected connections and relationships.
The initial proof of concept was developed as part of the Canadian Linked Data Initiative.
The current initiative has built on this work and is maintained and developed by the University of Alberta Library.

## Structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  The 'start' and 'build' scripts described further below are standard create-react-app scripts.  

The app is a so-called SPA (single page app) which means it loads the entire site into the browser on initial page load of index.html.  Navigation between pages is handled within the browser (using react-router) without any calls to the server.

There are three pages in this app, defined in src/pages:

Landing.js
Record.js 
Search.js

These pages, as well as all the components in src/components, use material-ui.

You can change the layout and styling from these pages.  Search.js is also where you can change the search form.  Read on...

### Searching

The main search form is in Search.js .  The form uses [React Hook Form](https://react-hook-form.com) to manage the form.  On submit of the form, the values from the form are available in a 'query' object passed into the 'handleSubmit' function.  The form values (the 'query' object) are passed on to src/hooks/useSOLRQuery.js which is a [React Custom Hook](https://reactjs.org/docs/hooks-custom.html).  

useSOLRQuery.js simply checks for each of the form values (e.g., institution, subject, etc.) and if present, adds the appropriate clause to the SOLR query string.  Finally, the paging params and the SOLR facet query are added to the string, and the string is sent off to the SOLR server.

The SOLR response is cleaned up a bit, and the faceting results restructed to return objects with properties that are expected by the visualizations.

The SOLR server URL and faceting queryies are defined in src/constants/index.js.  It's here that you would change the SOLR core.

### Contexts as Caches

We make two calls to the server to get the list of universities and the list of degrees, which we use for the corresponding Select dropdowns, but also to map universities to coordinates and to short names.

Rather than make these calls every time the dropdown is rendered or anytime we need to do a lookup in the list, we load both lists once and cache them in [React Contexts](https://reactjs.org/docs/context.html).  The contexts are available throughout the React App.  Our two contexts are defined in:

```
src/contexts/DegreeListContext.js
src/contexts/UniversityListContext.js
```

## Setting up a Development Environment

To setup your development environment follow the steps at [Create React App](https://create-react-app.dev) 

Basically, though, install node, clone this repository to your computer, run ``npm install`` and then ``npm start``

### `npm start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Deploying to the CanLink Server

Run the build script:

### `npm run build`

Builds the app for production to the `build` folder.<br />

Then copy the contents of that directory to the directory on the server (talk to Danoosh about location)

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
