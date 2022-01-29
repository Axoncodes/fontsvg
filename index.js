const svgJson = require('../svgjson');
const svg2ttf = require('svg2ttf');
const styleHandler = require('./src/style')
const htmlHandler = require('./src/html')
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
  .then(fontAssist)
  .then(svg2ttf)
  .then(ttf => Buffer.from(ttf.buffer))
  .then(ttf => fs.writeFileSync(`./rextest/font.ttf`, ttf))
}

async function handleInput(opt) {
  // info handling
  const { svgFile, fontsvgFile } = opt
  if((!svgFile && !fontsvgFile)) throw 'ERROR: No Input file was provided'

  // read the file (whether svg or fontsvg)
  const input = fs.readFileSync(svgFile || fontsvgFile, 'utf8')
  // if the parameter fontsvgFile was availabel, then just return the file content
  if(fontsvgFile) return input
  // otherwise, convert the svg file to fontsvg and then return
  return svgJson.convert({ outputFormat: 'fontsvg', input })
}

async function fontAssist(fontSvg) {
  if (!fs.existsSync('./rextest')) fs.mkdirSync('./rextest');
  fs.writeFileSync('./rextest/fontsvg.svg', fontSvg)
  const fontJson = await svgJson.parseJson(fontSvg)
  styleHandler(fontJson).then(cssFile => fs.writeFileSync('./rextest/style.css', cssFile))
  htmlHandler(fontJson).then(htmlFile => fs.writeFileSync('./rextest/index.html', htmlFile))
  return fontSvg;
}

module.exports = parseTTF;