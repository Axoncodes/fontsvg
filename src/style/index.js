const colorHandler = require('./color')

async function styleAssist(fontSvgJson) {
  let cssFileContent = '';
  await colorHandler(fontSvgJson)
  .then(classes => classes.forEach(cssClass => {
    cssFileContent += cssClass[1];
  }))
  return cssFileContent
}

module.exports = styleAssist;