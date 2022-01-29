const xjs = require('@axoncodes/xjs')

function fileHandler(glyph, subContentArr) {
  let fileContent = '';
  const name = glyph.attributes.unicode.replace(/-/g, '_');

  fileContent += `.${name} {`
  subContentArr.forEach(subContent => fileContent += subContent);
  fileContent += `} `

  return fileContent;
}

module.exports = fileHandler