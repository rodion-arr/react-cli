const fs = require('fs')
const path = require('path')

module.exports = {
  component: {
    content: fs.readFileSync(path.join(__dirname, 'component.txt'), { encoding: 'utf-8' }),
    fileName: '__COMPONENT_NAME__.tsx'
  },
  connectedComponent: {
    content: fs.readFileSync(path.join(__dirname, 'connected-component.txt'), { encoding: 'utf-8' }),
    fileName: 'Connected__COMPONENT_NAME__.tsx'
  },
  types: {
    content: fs.readFileSync(path.join(__dirname, 'types.txt'), { encoding: 'utf-8' }),
    fileName: 'types.tsx'
  }
}
