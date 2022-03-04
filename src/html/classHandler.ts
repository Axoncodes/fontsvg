import xjs from '@axoncodes/xjs'

export default function classHandler(fontJson) {
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
