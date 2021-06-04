const fs = require('fs')
const path = require('path')

module.exports = {
  componentContent: fs.readFileSync(path.join(__dirname, 'component.txt'), { encoding: 'utf-8' })
}
