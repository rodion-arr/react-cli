const { Component } = require('../../classes/commands/generate/Component')

module.exports = function () {
  return {
    command: 'generate',
    aliases: ['g'],
    desc: 'Generates files based on templates',
    builder: (yargs) => {
      return yargs
        .demandCommand(1, 'You must specify the command to run')
        .command({
          command: 'component',
          aliases: ['c'],
          desc: 'Generates component',
          builder: (yargs) => {
            yargs.options({
              name: {
                alias: 'n',
                desc: 'Component name',
                type: 'string',
                demandOption: true
              },
              path: {
                alias: 'p',
                desc: 'Generation target path. Default - cwd',
                default: process.cwd(),
                type: 'string',
                demandOption: true
              },
              styles: {
                alias: 's',
                desc: 'Style file format to generate. Use false to not generate styles file. Default - scss',
                default: 'scss',
                type: 'string',
                choices: ['css', 'scss', 'false'],
                demandOption: true
              },
              typescript: {
                alias: 't',
                desc: 'Pass true to generate typescript files',
                default: true,
                type: 'boolean',
                demandOption: true
              }
            })
          },
          handler: async (argv) => {
            try {
              const generator = new Component({
                componentName: argv.name,
                path: argv.path,
                stylesType: argv.styles,
                ts: argv.typescript
              })

              const result = generator.run()

              console.log('Files generated:')
              console.log(result.join('\n'))
            } catch (e) {
              console.error(`Error during generation - ${e.message}`)
            }
          }
        })
    }
  }
}
