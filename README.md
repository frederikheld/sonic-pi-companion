# Sonic Pi Companion

This app provides useful tools for working with [Sonic Pi](https://sonic-pi.net/).

## Development

### Project setup
```
$ npm install
```

#### Compiles and hot-reloads for development
```
$ npm run serve
```

<!--
#### Run your unit tests
```
$ npm run test:unit
```

#### Run your end-to-end tests
```
$ npm run test:e2e
```
//-->

#### Lints and fixes files
```
$ npm run lint
```

## Production

### Download resources

This repo comes with a script that automatically downloads the latest release of SonicPi from GitHub and extracts the required resources.

```
$ npm run update_resources
```

You can run this script whenever a new version of SonicPi was released.

Note that the resources have to be updated before the build as it will also create directory indizes that are being loaded into Vuex on build time.

### Build

#### Compiles and minifies for production
```
$ npm run build
```
