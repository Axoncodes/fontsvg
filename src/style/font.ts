export default function fontHandler(glyph) {
  let subfileContent = '';
  const name = glyph.attributes.unicodeBase;
  const order = parseInt(glyph.attributes.unicodeOrder);
  // const name = glyph.attributes.unicode.replace(/-/g, '_');
  subfileContent += `.${name}:${order ? 'after' : 'before'} {\n`
  subfileContent += `content: "${glyph.attributes.unicode}";\n`;
  subfileContent += `}\n`;
  return subfileContent;
}
