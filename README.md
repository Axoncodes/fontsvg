# parseFont
Generate fonts including required file assist for your svg icons

### Params :
```
/**
 * @param {file} svgFile : The file address of the svg icon to generate the fonts [example: './svgicon.svg']
 * @param {file} fontsvgFile: The file address of the font svg to be converted into fonts [example:'./fontsvg.svg']
 * @param {string} fontname: The font name you would like [default: 'rexfont']
 * @param {string} unicodePrefix: The unicode prefix is used as the name you will be using the generated font in css [default: 'RX'] [example: 'RX0-0']
 */
```

### Example :
```
const parseFont = require('parsefont');
fontsvg({
  svgFile: './alien.svg',
  fontname: 'ifont',
  unicodePrefix: 'RXXk'
})
```

### Outcome :
There will be a folder generated with the fontname selected(or default), including:
- font.ttf
- font.woff
- font.eot
- fontsvg.svg
- index.html
- style.css
You can use the html file to examine the generated fonts and use the css file as initial css required

Brough to you by [REXFONT](https://rexfont.com)
