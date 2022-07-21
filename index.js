const svgjson = require('svgjson');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const styleHandler = require('./src/style')
const htmlHandler = require('./src/html')
const fs = require('fs');
const path = require('path');

function write(opt) {
  return handleInput(opt)
  .then(fontAssist)
  .then(fontAssistWrite)
  .then(fontFormats)
  .then(fontFormatsWrite)
}

function get(opt) {
  return handleInput(opt)
  .then(async ({ fontSvg, fontname, suffix, weight }) => {
    return ({
      weight,
      ...await fontAssist({ fontSvg, fontname, suffix, weight, customHeadStyle: opt.customHeadStyle }),
      ...fontFormats({ fontSvg, fontname, suffix })
    })
  })
}

function getSingleDoc(opt) {
  return handleInput(opt)
  .then(async ({ fontSvg, suffix, weight }) => {

    const svg2ttfbuf = svg2ttf(fontSvg)
    const ttf2woffbuf = ttf2woff(svg2ttfbuf)
    const ttf2eotbuf = ttf2eot(svg2ttfbuf)

    const fontJson = await svgjson.parseJsonSync(fontSvg)
    const stylefile = await styleHandler({fontJson, suffix, weight, prefix: opt.customprefix})
    const htmlfile = await htmlHandler({fontJson, suffix, customHeadStyle: stylefile})

    return ({
      svg2ttfbuf: Buffer.from(svg2ttfbuf.buffer),
      ttf2woffbuf: Buffer.from(ttf2woffbuf),
      ttf2eotbuf: Buffer.from(ttf2eotbuf),
      stylefile,
      htmlfile,
    })
  })
}

function handleInput({
  weight,
  suffix,
  svgFiles,
  svgsData,
  fontsvgFile,
  fontname='rexfont',
  unicodePrefix='RX',
  namesMode=false,
}) {
  // info handling
  if ((!svgsData || !svgsData.length) && (!svgFiles || !svgFiles.length) && !fontsvgFile) throw 'ERROR: No Input file was provided'
  let suffixvar = suffix ? `-${suffix.replaceAll(/[- ]/g, '_')}` : '';
  if (svgFiles || svgsData) {
    // read and merge the files 
    return Promise.resolve(svgsData || svgjson.readFiles(svgFiles))
    .then(svgsData => svgsData.map(svgdata => svgjson.parseJson(svgdata)))
    .then(svgjson.encodeClasses)
    .then(svgsData => svgjson.mergeSvgs(svgsData, namesMode))
    // otherwise, convert the svg file to fontsvg and then return
    .then(input => svgjson.convert({ outputFormat: 'fontsvg', input, fontname, unicodePrefix }))
    .then(fontSvg => ({ fontSvg, fontname, suffix: suffixvar, weight }))
  } else {
    // if the parameter fontsvgFile was availabel, then just return the file content
    return fs.readFileSync(fontsvgFile, 'utf8')
    .then(fontSvg => ({ fontSvg, fontname, suffix: suffixvar, weight }))
  }
}

function fontAssist({ fontSvg, fontname, suffix, weight, customHeadStyle }) {
  return svgjson.parseJsonSync(fontSvg)
  .then(async fontJson => ({
    html: await htmlHandler({fontJson, suffix, customHeadStyle}),
    style: await styleHandler({fontJson, suffix, weight}),
    fontname,
    fontJson,
    fontSvg,
    suffix,
  }));
}

function fontAssistWrite({ style, html, fontname, fontSvg, suffix }) {
  if (!fs.existsSync(`./${fontname}${suffix}`)) fs.mkdirSync(`./${fontname}${suffix}`);
  fs.writeFileSync(`./${fontname}${suffix}/fontsvg${suffix}.svg`, fontSvg)
  fs.writeFileSync(`./${fontname}${suffix}/font${suffix}.css`, style)
  fs.writeFileSync(`./${fontname}${suffix}/index${suffix}.html`, html)
  return ({ fontSvg, fontname, suffix });
}

function fontFormats({ fontSvg, fontname, suffix }) {
  const svg2ttfbuf = svg2ttf(fontSvg)
  const ttf2woffbuf = ttf2woff(svg2ttfbuf)
  const ttf2eotbuf = ttf2eot(svg2ttfbuf)
  return ({
    fontname,
    suffix,
    svg2ttfbuf: Buffer.from(svg2ttfbuf.buffer),
    ttf2woffbuf: Buffer.from(ttf2woffbuf),
    ttf2eotbuf: Buffer.from(ttf2eotbuf),
  });
}

function fontFormatsWrite({ fontname, svg2ttfbuf, ttf2woffbuf, ttf2eotbuf, suffix }) {
  fs.writeFileSync(`./${fontname}${suffix}/font${suffix}.ttf`, svg2ttfbuf)
  fs.writeFileSync(`./${fontname}${suffix}/font${suffix}.woff`, ttf2woffbuf)
  fs.writeFileSync(`./${fontname}${suffix}/font${suffix}.eot`, ttf2eotbuf)
}

module.exports = {
  write,
  get,
  getSingleDoc,
};