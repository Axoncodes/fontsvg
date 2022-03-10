function extractFontface(json) {
  let fontface;
  json.forEach(tag => {
    if (tag.tag == 'font-face') fontface = tag;
  });
  return fontface;
}

module.exports = {
  extractFontface,
}