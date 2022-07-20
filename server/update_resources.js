'use strict'

const path = require('path')
const fs = require('fs/promises')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// eslint-disable-next-line camelcase
const child_process = require('child_process')

// CONFIG:
const resourcesDir = './resources'
const downloadPath = path.join(path.resolve(resourcesDir), '/latest-sonic-pi-release.tar.gz')
const releaseEndpoint = 'https://api.github.com/repos/sonic-pi-net/sonic-pi/releases/latest'
// const releaseEndpoint = 'https://api.github.com/repos/frederikheld/balena-reset/releases/latest' // small package for debugging

const indexFilePath = path.join('src', 'store', 'resources_index.json')
const publicDirectory = 'assets/resources' // path within src, will be expanded with '@' by Vue
const dirsToPublish = [
  { name: 'samples', path: path.join(path.resolve(resourcesDir), 'sonic-pi', 'etc', 'samples') }
]

async function main () {
  await prepareDirectory(resourcesDir)

  const downloadUrl = await getDownloadUrl(releaseEndpoint)

  const fileContents = await getFile(downloadUrl)

  await writeFile(fileContents, downloadPath)

  await unzipFile(downloadPath, resourcesDir)

  const directoryIndex = await publishFiles(resourcesDir, publicDirectory, dirsToPublish)

  await writeIndexFile(indexFilePath, directoryIndex)
}

main()

async function writeIndexFile (indexFilePath, index) {
  console.log('Writing resource index to Vuex ...')
  const fileHandle = await fs.open(indexFilePath, 'w')
  fileHandle.write(JSON.stringify(index, null, 2))
  console.log('  Done.')
}

async function publishFiles (resourcesDir, publicDir, dirsToPublish) {
  console.log('Publishing selected files ...')

  const index = await createDirectoryIndizes(resourcesDir, publicDir, dirsToPublish)

  // copy files:
  await Promise.all(
    Object.entries(index).map(async ([name, paths]) => {
      await fs.mkdir(path.resolve(path.join('src', publicDir, name)), { recursive: true })

      await Promise.all(
        paths.map(async (p) => {
          await fs.copyFile(path.resolve(p.src), path.resolve(path.join('src', p.dest)))
        })
      )
    })
  )

  // clean up index file:
  const indexToReturn = Object.entries(index).map(([key, paths]) => {
    const value = paths.map(path => {
      return path.dest
    })
    return { [key]: value }
  })

  console.log('  Done.')

  // write index file:
  return indexToReturn
}

async function createDirectoryIndizes (resourcesDir, publicDir, directories) {
  const index = {}

  await Promise.all(
    directories.map(async (directory) => {
      return new Promise(async (resolve, reject) => {
        const filenames = await fs.readdir(directory.path)

        index[directory.name] = filenames.filter(filename => filename.split('.')[1] === 'flac').map(entry => {
          return {
            src: path.join(path.resolve(directory.path), entry),
            dest: path.join('.', publicDir, directory.name, entry)
          }
        })

        resolve()
      })
    })
  )

  return index
}

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
