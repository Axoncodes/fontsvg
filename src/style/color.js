const xjs = require('@axoncodes/xjs')

function colorHandler(glyph) {
  let subfileContent = '';
  subfileContent += xjs.if(glyph, 'glyph.attributes.opacity') ? `opacity: ${glyph.attributes.opacity};` : '';
  subfileContent += xjs.if(glyph, 'glyph.attributes.fill') || xjs.if(glyph, 'glyph.attributes.color')
    ? `color: ${glyph.attributes.color || glyph.attributes.fill};` : '';
  return subfileContent;
}

module.exports = colorHandler