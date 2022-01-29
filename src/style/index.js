const tools = require('../../helpers/tools')

const colorHandler = require('./color')
const fontHandler = require('./font')
const fileHandler = require('./file')
const fontfaceHandler = require('./fontface')

async function styleAssist(fontJson) {
  let cssFileContent = '';

  tools.extractGlyphs(fontJson)
  .forEach((glyph) => {
    // subClass
    let colorContent = colorHandler(glyph);
    cssFileContent += fileHandler(glyph, [colorContent])
    // fullClass
    cssFileContent += fontHandler(glyph);
    cssFileContent += fontfaceHandler(fontJson);
  })

  return cssFileContent
}

module.exports = styleAssist;