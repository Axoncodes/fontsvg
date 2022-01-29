const xjs = require('@axoncodes/xjs')

function classHandler(fontJson) {
  return xjs.map(fontJson, (tag) => {
    if (tag.tag == 'glyph') {
      return tag.attributes.unicode.replace(/-/g, '_');
    }
  })
}

module.exports = classHandler;