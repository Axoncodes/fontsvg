function fontFamilyHandler(fontface) {
  let fileContent = '';
  fileContent += `font-family: "${fontface.attributes['font-family']}";`;
  return fileContent;
}

module.exports = fontFamilyHandler;