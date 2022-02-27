const fs = require('fs')
const svgJson = require('svgjson')

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
  extractFontface,
  readFiles,
}