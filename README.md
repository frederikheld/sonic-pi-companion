# Sonic Pi Companion

This app provides useful tools for working with [Sonic Pi](https://sonic-pi.net/).

## Development

### Install dependencies
```
$ npm install
```

### Compile and hot-reload for development
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

### Lint and fixes files
```
$ npm run lint
$ npm run lint --fix
```

The repo also comes with a VSCode configuration that enables auto format on save, if you have the official [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed.

## Production

### Prepare resources

Before you run the build script, you have to prepare the resources that are needed in the build process. This can be easily done by calling
```sh
$ npm run pre-build
```

This will download the latest release of Sonic Pi from GitHub and extract the required resources. It will also extract release info from `package.json`.

Alternatively, you can run both operations independetly with the following commands
```sh
$ npm run update-release-info
$ npm run update-resources
```

### Build

#### Compiles and minifies for production
```
$ npm run build
```
