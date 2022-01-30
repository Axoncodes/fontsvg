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

### Methods:
- write
- get

#### Example (the 'write' method) :
```
const parseFont = require('parsefont')
const options = { svgFile: './alien.svg', fontname: 'ifont', unicodePrefix: 'RXXk' }
fontsvg.write(options)
```
##### Outcome :
There will be a folder generated with the fontname selected(or default), including:
- font.ttf
- font.woff
- font.eot
- fontsvg.svg
- index.html
- style.css


#### Example (the 'get' method) :
```
const parseFont = require('parsefont')
const options = { svgFile: './alien.svg', fontname: 'ifont', unicodePrefix: 'RXXk' }
await fontsvg.get(options)
```
##### Outcome :
This method will return you the data that of the files that would be written to the files as previous

```
{
  svg2ttfbuf: font.ttf
  ttf2woffbuf: font.woff
  ttf2eotbuf: font.eot
  fontSvg: fontsvg.svg
  fontJson,
  fontname,
  html: index.html,
  style: style.css,
}
```

You can use the html file to examine the generated fonts and use the css file as initial css required

Brough to you by [REXFONT](https://rexfont.com)
