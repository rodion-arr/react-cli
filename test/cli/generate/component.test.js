const cp = require('child_process')
const util = require('util')
const path = require('path')
const assert = require('assert')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs-extra')
const { compareFolders } = require('../../util/compare-folders')

describe('Generate component', () => {
  const rcCommand = path.join(process.cwd(), 'bin', 'rc')
  const exec = util.promisify(cp.exec)
  const mkdir = util.promisify(fs.mkdir)

  it('should accept "component" command', async () => {
    const { stdout } = await exec(`${rcCommand} g component --help`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('Generates component'), true)
  })

  it('should accept "c" alias', async () => {
    const { stdout } = await exec(`${rcCommand} g c --help`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('Generates component'), true)
  })

  it('should require "name" param', async () => {
    const { stdout } = await exec(`${rcCommand} g c`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('Missing required argument: name'), true)
  })

  it('should output generated files list', async () => {
    const testId = uuidv4()
    const testFolder = path.join(__dirname, '..', '..', 'fixtures', 'tmp', testId)

    // create tmp test folder for generate command
    await mkdir(testFolder)

    const { stdout } = await exec(`${rcCommand} g c -n TestComponent`, { cwd: testFolder })

    // check output contains generated files
    assert.strictEqual(stdout.includes('Files generated:'), true)
    assert.strictEqual(stdout.includes('TestComponent.tsx'), true)
    assert.strictEqual(stdout.includes('TestComponent.scss'), true)

    await fs.remove(testFolder)
  })

  it('should correctly generate component with default params', async () => {
    const testId = uuidv4()
    const testFolder = path.join(__dirname, '..', '..', 'fixtures', 'tmp', testId)

    // create tmp test folder for generate command
    await mkdir(testFolder)

    await exec(`${rcCommand} g c -n TestComponent`, { cwd: testFolder })

    const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-scss')
    const targetDirSource = path.join(testFolder, 'TestComponent')

    // check generated files content
    await compareFolders(expectedDirSource, targetDirSource)

    await fs.remove(testFolder)
  })
})
