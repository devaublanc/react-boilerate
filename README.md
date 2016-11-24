# REACT SKELETON KIT

> Webapp React/Redux/Webpack/hot-loader


[![Travis](https://api.travis-ci.org/devaublanc/react-starter-kit.svg?style=flat-square)](https://travis-ci.org/devaublanc/react-starter-kit)
[![codecov coverage](https://img.shields.io/codecov/c/github/devaublanc/react-starter-kit.svg?style=flat-square)](https://codecov.io/github/devaublanc/react-starter-kit)
[![MIT License](https://img.shields.io/npm/l/react-player-ui.svg?style=flat-square)](http://opensource.org/licenses/MIT)


- [Installation](#installation)
- [Development](#development)
- [Production](#production)
- [Releases](#releases)
- [Contributing](#contibuting)
- [Stack](#stack)


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



## Development

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



## Production

### Publish a release

```console
$ npm run publish
```

### Run build production

```console
$ npm run build
```


## Architecture

```
├── /build/                     # The folder for compiled outputs
├── ├── /bundle.dev.js          # The bundle unminified
├── ├── /bundle.prod.js         # The bundle minified for the prod env
├── ├── /index.html             # The page html where the app is render
├── /src/                       # Sources
│   ├── /actions/               # Action creators for redux
│   ├── /components/            # Components disconnected from the redux store
│   │   ├── /Component/         # Component structure
│   │       ├── /__tests__/     # Tests using Mocha
│   │       ├── /index.css      # CSS for the component
│   │       ├── /index.js       # React Component
│   ├── /config/                # Project config
│   ├── /containers/            # Components connected to the redux store
│   ├── /middlewares/           # Redux middlewares
│   ├── /reducers/              # Redux reducers
│   ├── /index.js               # Entry point of the application
│   ├── /router.js              # Nested routes for react router
│   ├── /store.js               # Redux sore configuration
├── webpack.config.js           # Configurations for client-side and server-side bundles
└── package.json                # The list of libraries and utilities
```



## Changelog
* [Changelog](CHANGELOG.md)



## Contributing
* [Contributing](CONTRIBUTING.md)



## Stack
* [React.js](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/docs/)
* [Babel](https://babeljs.io/)
* [PostCSS](http://postcss.org/)
* [Mocha](https://mochajs.org/)
