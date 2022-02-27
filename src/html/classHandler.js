const xjs = require('@axoncodes/xjs')

function classHandler(fontJson) {
  return xjs.map(fontJson, (tag) => {
    if (tag.tag == 'glyph') {
      return {
        unicodeBase: tag.attributes.unicodeBase,
        unicodeOrder: tag.attributes.unicodeOrder,
      }
      // return tag.attributes.unicode.replace(/-/g, '_');
    }
  })
}

module.exports = classHandler;