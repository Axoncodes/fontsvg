function fontFamilyHandler(fontface) {
  return `font-family: "${fontface.attributes['font-family']}";\n`;
}

module.exports = fontFamilyHandler;