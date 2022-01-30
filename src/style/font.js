const xjs = require('@axoncodes/xjs')

function fontHandler(glyph) {
  let subfileContent = '';
  const name = glyph.attributes.unicode.replace(/-/g, '_');
  subfileContent += `.${name}:before {\n`
  subfileContent += `content: "${glyph.attributes.unicode}";\n`;
  subfileContent += `}\n`;
  return subfileContent;
}

module.exports = fontHandler