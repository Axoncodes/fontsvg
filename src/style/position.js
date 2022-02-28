function positionHandler(glyph) {
  return  glyph.attributes.single.indexOf('true') >= 0 ? `` : parseInt(glyph.attributes.unicodeOrder) == 0 ? `` : `position: absolute;\n`;
}

module.exports = positionHandler;