const cp = require('child_process')
const { promisify } = require('util')
const { normalize } = require('path')
const assert = require('assert')

describe('CLI behavior', () => {
  const rcCommand = normalize('./bin/rc')
  const exec = promisify(cp.exec)

  it('should demand at least 1 command', async () => {
    const { stdout } = await exec(rcCommand, { cwd: process.cwd() })

    assert.strictEqual(stdout.includes('You must specify the command to run'), true)
  })
})
