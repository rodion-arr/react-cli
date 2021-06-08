'use strict'
const yargs = require('yargs/yargs')
const path = require('path')
const { version } = require('../../package.json')

module.exports = (options = {}) => {
  const cli = yargs()
    .demandCommand(1, 'You must specify the command to run')
    .strictCommands(true)
    .strict(true)
    .commandDir(path.join(__dirname, 'commands'), {
      visit: (mod) => typeof mod === 'function' ? mod(options) : mod
    })
    .usage('$0 <command> [options]')
    .version(version)

  cli.wrap(Math.min(cli.terminalWidth(), 100))

  cli.fail((msg) => {
    console.log(`${msg}\n`)
    console.log('Specify --help for available options')
  })

  return (argv) => cli.parse(argv)
}
