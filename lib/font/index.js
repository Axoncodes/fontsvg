const svgjson = require('../../../svgjson');

// const GSUB = require('./gsub')
// const OS2 = require('./os2')
// const CMAP = require('./cmap')
const GLYPH = require('./glyph')

function prepare(fontpath) {
  return svgjson.convert({input: fontpath, outputFormat: 'fontsvg'})
  .then(svgjson.parsePoints)
}

function start(fontpath) {
  return prepare(fontpath)
  .then(GLYPH)
}

module.exports = start