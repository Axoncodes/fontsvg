const xjs = require('@axoncodes/xjs')

export default function colorHandler(glyph) {
  let subfileContent = '';
  if (xjs.if(glyph, 'glyph.attributes.opacity') || xjs.if(glyph, 'glyph.attributes.color')) {
    subfileContent += xjs.if(glyph, 'glyph.attributes.opacity') ? `opacity: ${glyph.attributes.opacity};` : '';
    subfileContent += xjs.if(glyph, 'glyph.attributes.fill') || xjs.if(glyph, 'glyph.attributes.color') ? `color: ${glyph.attributes.color || glyph.attributes.fill};` : (xjs.if(glyph, 'glyph.attributes.opacity') ? 'color: #000;' : '');
  }
  return subfileContent;
}
