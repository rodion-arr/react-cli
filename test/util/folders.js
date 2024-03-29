const fs = require('fs-extra')
const klaw = require('klaw')
const assert = require('assert')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const util = require('util')

/**
 * Reads folder contents recursively
 * Returns object with file name and contents
 * @param folderPath
 * @return {Promise<{}>}
 */
const readFolderContents = module.exports.readFolderContents = async function readFolderContents (folderPath) {
  const result = {}

  for await (const file of klaw(folderPath)) {
    if (file.stats.isFile()) {
      result[file.path.replace(folderPath, '')] = await fs.readFile(file.path, { encoding: 'utf-8' })
    }
  }

  return result
}

/**
 * Accepts 2 folders paths, reads them recursively and compares relative files content with assert.strictEquals
 * @param expectedDirSource
 * @param targetDirSource
 * @return {Promise<void>}
 */
module.exports.compareFolders = async function compareFolders (expectedDirSource, targetDirSource) {
  const expected = await readFolderContents(expectedDirSource)
  const generated = await readFolderContents(targetDirSource)

  for (const key of Object.keys(expected)) {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(generated, key), true, `Expected file ${key} was not generated`)
    assert.strictEqual(expected[key], generated[key], `File ${key} has wrong content`)
  }
}

/**
 * Creates test folder with random name and returns it's path
 */
module.exports.createTmpTestFolder = async function createTmpTestFolder () {
  const mkdir = util.promisify(fs.mkdir)
  const testId = uuidv4()
  const testFolder = path.join(__dirname, '..', 'fixtures', 'tmp', testId)

  // create tmp test folder for generate command
  await mkdir(testFolder)

  return testFolder
}
