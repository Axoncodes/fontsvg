import fs from 'fs';
import svgJson from 'svgjson';

export function readFiles(files) {
  return Promise.all(files.map(file => 
    svgJson.parseJson(fs.readFileSync(file, 'utf8'))
  ))
}

export function extractFontface(json) {
  let fontface;
  json.forEach(tag => {
    if (tag.tag == 'font-face') fontface = tag;
  });
  return fontface;
}
