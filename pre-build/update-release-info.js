'use strict'

const path = require('path')
const fs = require('fs/promises')

// src:
const packageFilePath = './package.json'

// dest:
const releaseInfoPath = './src/store/build-time-data/release-info.json'

async function main () {
  const packageData = await JSON.parse(await fs.readFile(path.resolve(packageFilePath)))

  const releaseInfo = {
    name: packageData.name,
    version: packageData.version
  }

  fs.writeFile(releaseInfoPath, JSON.stringify(releaseInfo, null, 2), { encoding: 'utf-8' })

  console.log(releaseInfo)
}

main()
