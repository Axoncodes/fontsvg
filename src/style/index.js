const tools = require('../../helpers/tools')

const colorHandler = require('./color')
const fontHandler = require('./font')
const fileHandler = require('./file')

async function styleAssist(fontJson) {
  let cssFileContent = '';

  tools.extractGlyphs(fontJson)
  .forEach((glyph) => {
    // subClass
    let colorContent = colorHandler(glyph);
    cssFileContent += fileHandler(glyph, [colorContent])
    // fullClass
    cssFileContent += fontHandler(glyph);
  })

  return cssFileContent
}

module.exports = styleAssist;