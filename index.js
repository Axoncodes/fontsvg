const svgJson = require('../svgjson');
const svg2ttf = require('svg2ttf');
const fs = require('fs');

/**
 *  
 * @param {string} svgFile If it's an svg file you want to parse to ttf file, fillout this parameter
 * @param {string} fontsvgFile Otherwise, it would be a fontsvgFile requsted to parse to ttf file
 * @param {string} filename The name of the file for the ttf font to be stored in
 * @retuen returnes the ttf file
 */
function parseTTF(opt) {
  return handleInput(opt)
  .then(svg2ttf)
  .then(ttf => Buffer.from(ttf.buffer))
  .then(ttf => fs.writeFileSync(opt.filename, ttf))
}

async function handleInput(opt) {
  // info handling
  const { svgFile, fontsvgFile, filename } = opt
  if((!svgFile && !fontsvgFile) || !filename) throw 'ERROR: No Input file was provided'

  // read the file (whether svg or fontsvg)
  const input = fs.readFileSync(svgFile || fontsvgFile, 'utf8')
  // if the parameter fontsvgFile was availabel, then just return the file content
  if(fontsvgFile) return input
  // otherwise, convert the svg file to fontsvg and then return
  const fontsvg = await svgJson.convert({ outputFormat: 'fontsvg', input })
  // write the fontsvg file
  fs.writeFileSync('./testfont.svg', fontsvg)
  return fontsvg
}

module.exports = parseTTF;