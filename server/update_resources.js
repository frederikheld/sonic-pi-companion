'use strict'

const path = require('path')
const fs = require('fs/promises')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// eslint-disable-next-line camelcase
const child_process = require('child_process')

// CONFIG:
const resourcesDir = path.resolve('./resources')
const downloadPath = path.join(resourcesDir, '/latest-sonic-pi-release.tar.gz')
const releaseEndpoint = 'https://api.github.com/repos/sonic-pi-net/sonic-pi/releases/latest'
// const releaseEndpoint = 'https://api.github.com/repos/frederikheld/balena-reset/releases/latest' // small package for debugging

async function main () {
  await prepareDirectory(resourcesDir)

  const downloadUrl = await getDownloadUrl(releaseEndpoint)

  const fileContents = await getFile(downloadUrl)

  await writeFile(fileContents, downloadPath)

  await unzipFile(downloadPath, resourcesDir)
}

main()

async function unzipFile (inputFilePath, outputDir) {
  console.log('Unpacking file ...')
  // Working with files in NodeJS is the second most fucked up thing in software
  // right after working with strings in C. So we're using shell script here:

  const unzipProcess = child_process.spawn('unzip', [inputFilePath, '-d', outputDir])

  try {
    await new Promise((resolve, reject) => {
      unzipProcess.stderr.on('data', (data) => {
        reject(new Error(data.toString()))
      })

      unzipProcess.stdout.on('data', (data) => {
        process.stdout.write('.') // Note: unzip sometimes hangs up. This keeps the command alive and gives the user feedback.
      })

      unzipProcess.on('close', (code) => {
        if (code === 0) {
          resolve('Done')
        } else {
          reject(new Error('Failed', { cause: code }))
        }
      })
    })

    console.log('  Done.')
  } catch (error) {
    console.error('  Failed. ' + error)
    return
  }

  console.log('Renaming directory to "sonic-pi" ...')

  const dirname = await new Promise((resolve, reject) => {
    const getDirnameProcess = child_process.spawn('sh', ['-c', 'unzip -Z -1 ' + inputFilePath + ' | head -1'])

    getDirnameProcess.stdout.on('data', data => resolve(data.toString().trim()))
    getDirnameProcess.stderr.on('data', data => reject(data.toString()))
  })

  try {
    await new Promise((resolve, reject) => {
      const moveProcess = child_process.spawn('mv', [path.join(outputDir, dirname), path.join(outputDir, 'sonic-pi')])

      moveProcess.stderr.on('data', data => reject(data.toString()))
      moveProcess.on('close', (code) => {
        if (code === 0) {
          resolve('Done')
        } else {
          reject(new Error('Failed', { cause: code }))
        }
      })
    })

    console.log('  Done.')
  } catch (error) {
    console.error('  Failed. ' + error)
  }
}

/**
 *
 * @param {ArrayBuffer} file
 * @param {String} destPath
 */
async function writeFile (contents, destPath) {
  console.log('Writing file to ' + destPath)

  const fileHandle = await fs.open(destPath, 'w')
  await fileHandle.write(new DataView(contents))
  await fileHandle.close()

  console.log('  Done.')
}

/**
 *
 * @param {String} url
 * @returns ArrayBuffer
 */
async function getFile (url) {
  console.log('Downloading latest release from ' + url + ' ...')
  const response = await fetch(url, {
    method: 'get'
  })

  const data = await response.arrayBuffer()

  console.log('  Done.')

  return data
}

async function getDownloadUrl (apiEndpoint) {
  console.log('Fetching latest Sonic Pi release from ' + apiEndpoint + ' ...')

  const response = await fetch(apiEndpoint, { method: 'get' })
  const data = await response.json()

  console.log('  Done.')

  return data.zipball_url
}

async function prepareDirectory (path) {
  console.log('Preparing resources directry ' + path + ' ...')
  try {
    await fs.access(path, fs.W_OK | fs.R_OK)

    try {
      console.log('  Directory exists. Trying to remove ...')
      await fs.rm(path, { recursive: true })
      console.log('    Done.')
    } catch (error) {
      console.log('    ERROR: Could not remove directory!')
      console.error(error)
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('  Directory does not exist yet.')
    } else {
      console.error(error)
    }
  }

  try {
    console.log('  Creating directory ...')
    await fs.mkdir(path)
    console.log('    Done.')
  } catch (error) {
    console.log('    ERROR: Could not create directory!')
    console.error(error)
  }

  console.log('  Done.')
}
