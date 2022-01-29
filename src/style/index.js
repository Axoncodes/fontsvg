const colorHandler = require('./color')

async function styleAssist(fontJson) {
  let cssFileContent = '';

  fontJson.forEach(tag => {
    if (tag.tag == 'glyph') {
      colorHandler(tag)
    }
  })
}

module.exports = styleAssist;