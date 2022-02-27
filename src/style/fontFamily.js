function fontFamilyHandler(fontface) {
  return `font-family: "${fontface.attributes['font-family']}";`;
}

module.exports = fontFamilyHandler;