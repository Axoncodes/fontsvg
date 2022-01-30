function extractGlyphs(json) {
  const glyphs = [];
  json.forEach(tag => {
    if (tag.tag == 'glyph') glyphs.push(tag);
  });
  return glyphs;
}

function extractFontface(json) {
  let fontface;
  json.forEach(tag => {
    if (tag.tag == 'font-face') fontface = tag;
  });
  return fontface;
}

module.exports = {
  extractGlyphs,
  extractGlyphsAsync: json => Promise.resolve(extractGlyphs(json)),
  extractFontface,
}