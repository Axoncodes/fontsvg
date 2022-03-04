import svgJson from 'svgjson'
import svg2ttf from 'svg2ttf'
import ttf2woff from 'ttf2woff'
import ttf2eot from 'ttf2eot'
import styleHandler from './src/style'
import htmlHandler from './src/html'
import fs from 'fs'
import {readFiles} from './helpers/tools'

export function write(opt) {
  return handleInput(opt)
  .then(fontAssist)
  .then(fontAssistWrite)
  .then(fontFormats)
  .then(fontFormatsWrite)
}

export function get(opt) {
  return handleInput(opt)
  .then(async ({ fontSvg, fontname }) => ({
    ...await fontAssist({ fontSvg, fontname }),
    ...fontFormats({ fontSvg, fontname })
  }))
}

/**
 *  
 * @param {array} svgFiles Array of SVG files addresses to be converted into single font
 * @param {string} fontsvgFile Otherwise, it would be a fontsvgFile requsted to parse to ttf file
 * @param {string} filename The name of the file for the ttf font to be stored in
 * @retuen returnes the ttf file
 */
function handleInput(opt) {
  // info handling
  const { svgFiles, fontsvgFile } = opt
  let { fontname, unicodePrefix } = opt
  if ((!svgFiles || !svgFiles.length) && !fontsvgFile) throw 'ERROR: No Input file was provided'
  if (!fontname) fontname = 'rexfont'
  if (!unicodePrefix) unicodePrefix = 'RX'

  if (svgFiles) {
    // read and merge the files
    return mergeSvgs(svgFiles)
    // otherwise, convert the svg file to fontsvg and then return
    .then(input => svgJson.convert({ outputFormat: 'fontsvg', input, fontname, unicodePrefix }))
    .then(fontSvg => ({ fontSvg, fontname }))
  } else {
    // read the file (whether svg or fontsvg)
    return fs.readFileSync(fontsvgFile, 'utf8')
    // if the parameter fontsvgFile was availabel, then just return the file content
    .then(fontSvg => ({ fontSvg, fontname }))
  }
}

async function mergeSvgs(svgFiles) {
  let content = ''
  // get informations
  const svgsData = await readFiles(svgFiles)
  .then(svgsData => svgJson.encodeClasses(svgsData))
  const svgsPathes = svgsData.map(svgJson.extractPathes)
  const svgsStyles = svgsData.map(svgJson.extractStyles)

  // generate the singular svg file
  content += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgsData[0][0].attributes.viewBox.toString().replaceAll(',', ' ')}>\n`
  content += `<defs>`
  if (svgsStyles.flat().flat().length > 0) {
    content += `<style>`
    svgsStyles.flat().flat().forEach((style, i) => {
      content += `${style[0]} {`
      style[1].forEach(properties => {
        if (properties && properties.length)
          content += `${properties.toString().replaceAll(',', ':')};`
      })
      content += `}\n`
    })
    content += `</style>`
  }
  content += `</defs>`
  
  svgsPathes.forEach((pathes, count) => {
    pathes.forEach(path => {
      let cclass = path.attributes && path.attributes.class ? path.attributes.class  : ''
      content += path.tag == 'path' ? `<path class="${cclass}" rxcode="${count}" d="${path.attributes.d}"/>\n` : (path.tag == 'g' ? `<${path.tag} class="${cclass}">` : '</g>')
    })
  })
  content += `</svg>`
  return content
}

function fontAssist({ fontSvg, fontname }) {
  return svgJson.parseJson(fontSvg)
  .then(async fontJson => ({
    html: await htmlHandler(fontJson),
    style: await styleHandler(fontJson),
    fontname,
    fontJson,
    fontSvg,
  }));
}

function fontAssistWrite({ style, html, fontname, fontSvg }) {
  if (!fs.existsSync(`./${fontname}`)) fs.mkdirSync(`./${fontname}`);
  fs.writeFileSync(`./${fontname}/fontsvg.svg`, fontSvg)
  fs.writeFileSync(`./${fontname}/font.css`, style)
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
