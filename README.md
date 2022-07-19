# sonic-pi-tools

## Development

### Project setup
```
$ npm install
```

#### Compiles and hot-reloads for development
```
$ npm run serve
```

#### Compiles and minifies for production
```
$ npm run build
```

#### Run your unit tests
```
$ npm run test:unit
```

#### Run your end-to-end tests
```
$ npm run test:e2e
```

#### Lints and fixes files
```
$ npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Production

### Download resources

This repo comes with a script that automatically downloads the latest release of SonicPi from GitHub.

```
$ npm run update_resources
```

You can run this script whenever a new version of SonicPi was released.

Note that the resources have to be updated before the build as it will also create directory indizes that are being loaded into Vuex on build.

### Build

```
$ npm run build
```
