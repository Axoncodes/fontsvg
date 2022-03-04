import {extractFontface} from '../../helpers/tools'
import svgJSon from 'svgjson'
import colorHandler from './color'
import fontfaceHandler from './fontface'
import fontFamilyHandler from './fontFamily'
import positionHandler from './position'

export default async function styleAssist(fontJson) {
  let cssFileContent = '';
  const fontface = extractFontface(fontJson)
  cssFileContent += `.rexfontinc {
    ${fontFamilyHandler(fontface)};
    font-style: normal;
    position: relative;
  }`
  Object.entries(svgJSon.extractGlyphSets(fontJson)).forEach((glyphs:any, i) => {
    glyphs[1].forEach((glyph, j) => {
      let order = parseInt(glyph.attributes.unicodeOrder)
      cssFileContent += `.${glyphs[0]}:${order ? 'after' : 'before'} {
        content: "${glyph.attributes.unicode}";
        ${positionHandler(glyph)}
        ${colorHandler(glyph)}
      }\n`
    })
  })
  cssFileContent += fontfaceHandler(fontface);

  return cssFileContent
}
