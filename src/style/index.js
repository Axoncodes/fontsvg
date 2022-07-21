const tools = require('../../helpers/tools')
const svgJSon = require('svgjson')
const colorHandler = require('./color')
const fontfaceHandler = require('./fontface')
const fontFamilyHandler = require('./fontFamily')
const positionHandler = require('./position')

async function styleAssist({fontJson, suffix, weight, prefix}) {
  let cssFileContent = '';
  const fontface = tools.extractFontface(fontJson)
  cssFileContent += `.rexfont_init {
    ${fontFamilyHandler(fontface)};
    font-style: normal;
    position: relative;
  }`
  Object.entries(svgJSon.extractGlyphSets(fontJson)).forEach((glyphs, i) => {
    if (glyphs[1][0].attributes["fill"]) {
      cssFileContent += `.rx_color {`
      cssFileContent += `color: ${glyphs[1][0].attributes["fill"]};`
      cssFileContent += `}`

      cssFileContent += `body {`
      cssFileContent += `background-color: ${glyphs[1][0].attributes["fill"]==`#000` ? `#fff` : '#000'};`
      cssFileContent += `}`
    }
    if (glyphs[1][0].attributes["fontsize"]) {
      cssFileContent += `.rx_fontsize {`
      cssFileContent += `font-size: ${glyphs[1][0].attributes["fontsize"]};`
      cssFileContent += `}`
    }
    glyphs[1].forEach((glyph, j) => {
      let order = parseInt(glyph.attributes.unicodeOrder)
      cssFileContent += `.${glyphs[1][0].attributes["glyph-name"]}:${order ? 'after' : 'before'} {
        content: "${glyph.attributes.unicode}";
        ${positionHandler(glyph)}
        ${colorHandler(glyph)}
      }\n`
    })
  })
  cssFileContent += fontfaceHandler(fontface, suffix, weight, prefix);

  return cssFileContent
}

module.exports = styleAssist;