const tools = require('../../helpers/tools')

const colorHandler = require('./color')
const fontHandler = require('./font')
const fileHandler = require('./file')
const fontfaceHandler = require('./fontface')
const fontFamilyHandler = require('./fontFamily')

async function styleAssist(fontJson) {
  let cssFileContent = '';
  const fontface = tools.extractFontface(fontJson)
  tools.extractGlyphs(fontJson)
  .forEach((glyph) => {
    // subClass
    let colorContent = colorHandler(glyph);
    let fontFamily = fontFamilyHandler(fontface)
    cssFileContent += fileHandler(glyph, [colorContent, fontFamily])
    // fullClass
    cssFileContent += fontHandler(glyph);
    cssFileContent += fontfaceHandler(fontface);
  })

  return cssFileContent
}

module.exports = styleAssist;