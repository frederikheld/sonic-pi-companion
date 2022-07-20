# Sonic Pi Companion

This app provides useful tools for working with [Sonic Pi](https://sonic-pi.net/).

## Contribute

You are happily invited to contribute your ideas, improvements and new features!

If you found a bug or miss a feature, please check the [Issues](https://github.com/frederikheld/sonic-pi-companion/issues) if it was already filed. If not, please [open a new Issue](https://github.com/frederikheld/sonic-pi-companion/issues/new) with some details what went wrong.

If you would like to contribute, feel free to submit [Pull Requests](https://github.com/frederikheld/sonic-pi-companion/pulls). Pull Requests that are related to open Issues will be treated with priority.

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
