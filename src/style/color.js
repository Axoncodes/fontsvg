const tools = require('../../helpers/tools')
const xjs = require('@axoncodes/xjs')

function colorHandler(fontSvgJson) {
  return tools.extractGlyphsAsync(fontSvgJson)
  .then(glyphs => xjs.map(glyphs, (glyph) => {
      let subfileContent = '';
      if (xjs.if(glyph, 'glyph.attributes.opacity') || xjs.if(glyph, 'glyph.attributes.color')) {
        subfileContent += `.${glyph.attributes.unicode.replace(/-/g, '_')} {`
        subfileContent += xjs.if(glyph, 'glyph.attributes.opacity') ? `opacity: ${glyph.attributes.opacity};` : '';
        subfileContent += xjs.if(glyph, 'glyph.attributes.fill') || xjs.if(glyph, 'glyph.attributes.color') ? `color: ${glyph.attributes.color || glyph.attributes.fill};` : (xjs.if(glyph, 'glyph.attributes.opacity') ? 'color: #000;' : '');
        subfileContent += `}`
        return ([glyph.attributes.unicode.replace(/-/g, '_'), subfileContent])
      }
      return;
    }))
}

module.exports = colorHandler