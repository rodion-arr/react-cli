const cp = require('child_process')
const util = require('util')
const path = require('path')
const assert = require('assert')
const fs = require('fs-extra')
const { compareFolders, createTmpTestFolder } = require('../../util/folders')

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
    const testFolder = await createTmpTestFolder()

    const { stdout } = await exec(`${rcCommand} g c -n TestComponent`, { cwd: testFolder })

    // check output contains generated files
    assert.strictEqual(stdout.includes('Files generated:'), true)
    assert.strictEqual(stdout.includes('TestComponent.tsx'), true)
    assert.strictEqual(stdout.includes('TestComponent.scss'), true)

    await fs.remove(testFolder)
  })

  it('should correctly generate component with default params', async () => {
    const testFolder = await createTmpTestFolder()

    await exec(`${rcCommand} g c -n TestComponent`, { cwd: testFolder })

    const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-scss')
    const targetDirSource = path.join(testFolder, 'TestComponent')

    // check generated files content
    await compareFolders(expectedDirSource, targetDirSource)

    await fs.remove(testFolder)
  })

  it('should check target folder existence', async () => {
    const testFolder = await createTmpTestFolder()
    await mkdir(path.join(testFolder, 'TestComponent'))

    const { stderr } = await exec(`${rcCommand} g c -n TestComponent`, { cwd: testFolder })

    assert.strictEqual(stderr.includes('Folder already exists!'), true)

    await fs.remove(testFolder)
  })

  describe('Component generation with different styles', () => {
    it('should accept --styles option', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent --styles scss`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-scss')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      // check generated files content
      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })

    it('should correctly generate component with scss', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent -s scss`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-scss')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      // check generated files content
      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })

    it('should correctly generate component with less', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent -s less`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-less')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      // check generated files content
      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })

    it('should correctly generate component without styles', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent -s false`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-simple-no-styles')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })
  })

  describe('Generate connected components', () => {
    it('should correctly generate connected component', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent --connected`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-connected-scss')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })

    it('should accept -c alias for connected component', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent -c`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-connected-scss')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })

    it('should correctly generate connected component without styles', async () => {
      const testFolder = await createTmpTestFolder()

      await exec(`${rcCommand} g c -n TestComponent -c -s false`, { cwd: testFolder })

      const expectedDirSource = path.join(process.cwd(), 'test', 'fixtures', 'asserts', 'ts-connected-no-styles')
      const targetDirSource = path.join(testFolder, 'TestComponent')

      await compareFolders(expectedDirSource, targetDirSource)

      await fs.remove(testFolder)
    })
  })
})
