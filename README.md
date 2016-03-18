# REACT STARTER KIT

> For create a react App

## Installation

### install dependancies

```console
$ npm i
```

### Run application locally

```console
$ npm start
```

Then go to [http://localhost:8080/](http://localhost:8080/)


### Export package

```console
$ npm run deploy
$ npm run watch:test
```

### Run tests

```console
$ npm test
$ npm run watch:test
```

### Run cover

```console
$ npm run cover
$ npm run watch:cover
```

## Directory Layout

```
├── /build/                     # The folder for compiled output
├── ├── /bundle.dev.js          # The bundle unminified
├── ├── /bundle.js              # The bundle minified for the prod env
├── ├── /index.html             # The page html where the app is render
├── /entries/                   # The entries inputs for app
├── ├── /dev.js                 # The sample of the App
├── ├── /prod.js                # Export of the App
├── /node_modules/              # Libraries and utilities
├── /web_modules/               # React components
│   ├── /Component/             # Action creators that allow to trigger a dispatch to stores
│       ├── /__tests__/         # Tests using AVA
│       ├── /index.js           # React Component
├── webpack.config.js           # Configurations for client-side and server-side bundles
└── package.json                # The list of libraries and utilities
```

##STACK

* [React.js](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/docs/)
* [Babel](https://babeljs.io/)
* [PostCSS](http://postcss.org/)
* [AVA](https://github.com/sindresorhus/ava)
