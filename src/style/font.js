const xjs = require('@axoncodes/xjs')

function fontHandler(glyph) {
  let subfileContent = '';
  const name = glyph.attributes.unicode.replace(/-/g, '_');
  subfileContent += `.${name}::before {`
  subfileContent += `content: "${name}"`;
  subfileContent += `} `;
  return subfileContent;
}

module.exports = fontHandler