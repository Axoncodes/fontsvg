const fs = require('fs')
const xjs = require('../../xjs')
// const xjs = require('@axoncodes/xjs')
const svgJson = require('svgjson')

function extractGlyphs(json) {
  const glyphs = [];
  json.forEach(tag => {
    if (tag.tag == 'glyph') glyphs.push(tag);
  });
  return glyphs;
}

function extractPathes(svgJsons) {
  const pathes = []
  svgJsons.forEach(svgJson => {
    if (svgJson.tag == 'path' || svgJson.tag == 'g' || svgJson.tag == '/g') pathes.push(svgJson)
  })
  return pathes
  // return xjs.mapIf(svgJsons, ['tag.attributes.d', 'tag.attributes.class'], true)
}

function extractStyles(svgJsons) {
  return xjs.mapIf(svgJsons, 'tag.style', true)
}

function readFiles(files) {
  return Promise.all(files.map(file => 
    svgJson.parseJson(fs.readFileSync(file, 'utf8'))
  ))
}

function extractFontface(json) {
  let fontface;
  json.forEach(tag => {
    if (tag.tag == 'font-face') fontface = tag;
  });
  return fontface;
}

module.exports = {
  extractGlyphs,
  extractGlyphsAsync: json => Promise.resolve(extractGlyphs(json)),
  extractFontface,
  extractPathes,
  extractStyles,
  readFiles,
}