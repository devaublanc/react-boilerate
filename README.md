# REACT STARTER KIT

> To create a react App

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


### Run build production

```console
$ npm run build
```

### Run tests

```console
$ npm test
$ npm run watch:test
```

### Run cover

```console
$ npm run cover
```

### Run the local server for styleguide

```console
$ npm run styleguide-server
```

### Run build for the styleguide

```console
$ npm run styleguide-build
```

## Directory Layout

```
├── /build/                     # The folder for compiled outputs
├── ├── /bundle.dev.js          # The bundle unminified
├── ├── /bundle.prod.js         # The bundle minified for the prod env
├── ├── /index.html             # The page html where the app is render
├── /src/                       # Sources
│   ├── /actions/               # Action creators for redux
│   ├── /components/            # Components disconnected from the redux store
│   │   ├── /Component/         # Component structure
│   │       ├── /__tests__/     # Tests using AVA
│   │       ├── /index.css      # CSS for the component
│   │       ├── /index.js       # React Component
│   ├── /config/                # Project config
│   ├── /containers/            # Components connected to the redux store
│   ├── /middlewares/           # Redux middlewares
│   ├── /reducers/              # Redux reducers
│   ├── /index.js               # Entry point of the application
│   ├── /store.js               # Redux sore configuration
├── webpack.config.js           # Configurations for client-side and server-side bundles
└── package.json                # The list of libraries and utilities
```

##STACK

* [React.js](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/docs/)
* [Babel](https://babeljs.io/)
* [PostCSS](http://postcss.org/)
* [AVA](https://github.com/sindresorhus/ava)

## Contributing
* [Contributing] (CONTRIBUTING.md)
