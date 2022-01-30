const xjs = require('@axoncodes/xjs')

function fileHandler(glyph, subContentArr) {
  let fileContent = '';
  const name = glyph.attributes.unicode.replace(/-/g, '_');

  fileContent += `.${name} {\n`
  subContentArr.forEach(subContent => fileContent += `${subContent}\n`);
  fileContent += `}\n`

  return fileContent;
}

module.exports = fileHandler