const cp = require('child_process')
const { promisify } = require('util')
const { normalize } = require('path')
const assert = require('assert')

describe('Generate command', () => {
  const rcCommand = normalize('./bin/rc')
  const exec = promisify(cp.exec)

  it('should demand at least 1 command', async () => {
    const { stdout } = await exec(`${rcCommand} g`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('You must specify what you want to generate'), true)
  })

  it('should accept "generate" command', async () => {
    const { stdout } = await exec(`${rcCommand} generate --help`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('Generates files based on templates'), true)
  })

  it('should accept "g" alias', async () => {
    const { stdout } = await exec(`${rcCommand} g --help`, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('Generates files based on templates'), true)
  })
})
