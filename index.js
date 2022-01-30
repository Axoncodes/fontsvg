const svgJson = require('../svgjson');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
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
function write(opt) {
  return handleInput(opt)
  .then(fontAssist)
  .then(fontAssistWrite)
  .then(fontFormats)
  .then(fontFormatsWrite)
}

function get(opt) {
  return handleInput(opt)
  .then(async ({ fontSvg, fontname }) => ({
    ...await fontAssist({ fontSvg, fontname }),
    ...fontFormats({ fontSvg, fontname })
  }))
}

function handleInput(opt) {
  // info handling
  const { svgFile, fontsvgFile } = opt
  let { fontname, unicodePrefix } = opt
  if (!svgFile && !fontsvgFile) throw 'ERROR: No Input file was provided'
  if (!fontname) fontname = 'rexfont'
  if (!unicodePrefix) unicodePrefix = 'RX'

  // read the file (whether svg or fontsvg)
  const input = fs.readFileSync(svgFile || fontsvgFile, 'utf8')
  // if the parameter fontsvgFile was availabel, then just return the file content
  if(fontsvgFile) return ({ fontSvg: input, fontname })
  // otherwise, convert the svg file to fontsvg and then return
  return svgJson.convert({ outputFormat: 'fontsvg', input, fontname, unicodePrefix })
  .then(fontSvg => ({ fontSvg, fontname }))
}

function fontAssist({ fontSvg, fontname }) {
  if (!fs.existsSync(`./${fontname}`)) fs.mkdirSync(`./${fontname}`);
  fs.writeFileSync(`./${fontname}/fontsvg.svg`, fontSvg)
  return svgJson.parseJson(fontSvg)
  .then(async fontJson => ({
    style: await styleHandler(fontJson),
    html: await htmlHandler(fontJson),
    fontname,
    fontJson,
    fontSvg,
  }));
}

function fontAssistWrite({ style, html, fontname, fontSvg }) {
  fs.writeFileSync(`./${fontname}/style.css`, style)
  fs.writeFileSync(`./${fontname}/index.html`, html)
  return ({ fontSvg, fontname });
}

function fontFormats({ fontSvg, fontname }) {
  const svg2ttfbuf = svg2ttf(fontSvg)
  const ttf2woffbuf = ttf2woff(svg2ttfbuf)
  const ttf2eotbuf = ttf2eot(svg2ttfbuf)
  return ({
    fontname,
    svg2ttfbuf: Buffer.from(svg2ttfbuf.buffer),
    ttf2woffbuf: Buffer.from(ttf2woffbuf),
    ttf2eotbuf: Buffer.from(ttf2eotbuf),
  });
}

function fontFormatsWrite({ fontname, svg2ttfbuf, ttf2woffbuf, ttf2eotbuf }) {
  fs.writeFileSync(`./${fontname}/font.ttf`, svg2ttfbuf)
  fs.writeFileSync(`./${fontname}/font.woff`, ttf2woffbuf)
  fs.writeFileSync(`./${fontname}/font.eot`, ttf2eotbuf)
}

module.exports = {
  write,
  get,
};