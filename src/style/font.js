function fontHandler(glyph) {
  let subfileContent = '';
  const name = glyph.attributes.unicodeBase;
  const order = parseInt(glyph.attributes.unicodeOrder);
  subfileContent += `.${name}:${order ? 'after' : 'before'} {\n`
  subfileContent += `content: "${glyph.attributes["glyph-name"]}";\n`;
  subfileContent += `}\n`;
  return subfileContent;
}

module.exports = fontHandler