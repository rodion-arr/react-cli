'use strict'

const path = require('path')
const fs = require('fs')

class Component {
  constructor (options) {
    this.componentName = options.componentName
    this.path = options.path
    this.stylesType = options.stylesType
    this.ts = options.ts
    this.connected = options.connected
    this.generatedFiles = []
  }

  /**
   * Main command handler
   */
  run () {
    const targetComponentFolderPath = path.join(this.path, this.componentName)

    this._makeComponentDir(targetComponentFolderPath)
    this._writeFiles(targetComponentFolderPath)

    return this.generatedFiles
  }

  _makeComponentDir (targetComponentFolderPath) {
    if (fs.existsSync(targetComponentFolderPath)) {
      throw new Error(`Folder already exists! - ${targetComponentFolderPath}`)
    }

    fs.mkdirSync(targetComponentFolderPath)
  }

  _writeFiles (targetComponentFolderPath) {
    const blueprintLang = this.ts ? 'ts' : 'js'
    const blueprintType = this.connected ? 'connected' : 'simple'
    const { componentContent } = require(`../../../blueprints/component/${blueprintLang}/${blueprintType}`)

    const generatedStylesFile = this._writeStylesFile(targetComponentFolderPath)
    this._writeComponentFile(targetComponentFolderPath, componentContent, generatedStylesFile)
  }

  _writeStylesFile (targetComponentFolderPath) {
    if (this.stylesType === 'false') {
      return false
    }

    const styleFileName = `${this.componentName}.${this.stylesType}`
    const stylesFilePath = path.join(targetComponentFolderPath, styleFileName)

    fs.writeFileSync(stylesFilePath, '', { encoding: 'utf-8' })
    this.generatedFiles.push(stylesFilePath)

    return styleFileName
  }

  _writeComponentFile (targetComponentFolderPath, componentContent, stylesFileName) {
    const componentFileName = this.ts ? `${this.componentName}.tsx` : `${this.componentName}.jsx`
    const componentFilePath = path.join(targetComponentFolderPath, componentFileName)
    let contentPrepared = componentContent.replace(/__COMPONENT_NAME__/g, this.componentName)

    if (!stylesFileName) {
      contentPrepared = contentPrepared.replace(/__STYLES_IMPORT__/g, '').trim()
      contentPrepared += '\n'
    } else {
      contentPrepared = contentPrepared.replace(/__STYLES_IMPORT__/g, `import './${stylesFileName}';`)
    }

    fs.writeFileSync(componentFilePath, contentPrepared, { encoding: 'utf-8' })
    this.generatedFiles.push(componentFilePath)
  }
}

module.exports = { Component }