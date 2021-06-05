const fs = require('fs')
const path = require('path')

module.exports = {
  component: {
    content: fs.readFileSync(path.join(__dirname, 'component.txt'), { encoding: 'utf-8' }),
    fileName: '__COMPONENT_NAME__.tsx'
  }
}
