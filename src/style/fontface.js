function fontfaceHandler(fontface, suffix, weight, prefix=".") {
  let fileContent = '';
  fileContent += `@font-face {\n`
  fileContent += `font-family: "${fontface.attributes['font-family']}";\n`;
  fileContent += `src: url('${prefix}/font${suffix}.eot'); /* IE9 Compat Modes */\n`;
  fileContent += `src: url('${prefix}/font${suffix}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */\n`;
  // fileContent += `url('${prefix}/font${suffix}.woff2') format('woff2'), /* Super Modern Browsers */\n`;
  fileContent += `url('${prefix}/font${suffix}.woff') format('woff'), /* Pretty Modern Browsers */\n`;
  fileContent += `url('${prefix}/font${suffix}.ttf')  format('truetype'), /* Safari, Android, iOS */\n`;
  fileContent += `url('${prefix}/fontsvg${suffix}.svg#ifont') format('svg'); /* Legacy iOS */\n`;
  fileContent += `font-weight: ${weight};\n`;
  fileContent += `}\n`;
  return fileContent;
}

module.exports = fontfaceHandler