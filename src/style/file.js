const xjs = require('@axoncodes/xjs')

function fileHandler(glyph, subContentArr) {
  let fileContent = '';
  if (parseInt(glyph.attributes.unicodeOrder) == 0) {
    const name = glyph.attributes.unicodeBase;
    // const name = glyph.attributes.unicode.replace(/-/g, '_');

    fileContent += `.${name} {\n`
    subContentArr.forEach(subContent => {
      if (subContent.length) fileContent += `${subContent}\n`
    })
    fileContent += `}\n`
  }

  return fileContent;
}

module.exports = fileHandler