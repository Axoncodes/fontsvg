# parseFont
Generate fonts including required file assist for your svg icons

### Params :
```
/**
 * @param {file} svgFile : The file address of the svg icon to generate the fonts [example: './svgicon.svg'] OR USE svgFiles/svgsData
 * @param {array} svgFiles : Array of file address of the svg icons to generate the fonts [example: ['./svgicon1.svg', './svgicon2.svg']] OR USE svgFile/svgsData
 * @param {array} svgsData : Array of the svg icons xml tags(content) to generate the fonts
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
- font.css

# Ability to handle multiple icons(merge icons)

#### Example (the 'get' method) :
```
const parseFont = require('parsefont')
const options = { 
  svgFile: './alien.svg',
  fontname: 'ifont',
  unicodePrefix: 'RXXk'
}
await fontsvg.get(options)
```
you can now pass your custom style to be printed in the header of html file. 
example: 
```
const options = { 
  svgFile: './alien.svg',
  fontname: 'ifont',
  unicodePrefix: 'RXXk',
  customHeadStyle: ".title {color: red}"
}
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


#### getSingleDoc -> get files directly
##### usage
```
await fontsvg.get(getSingleDoc)
```
#### output
```
{
  svg2ttfbuf(buffer),
  ttf2woffbuf(buffer),
  ttf2eotbuf(buffer),
  stylefile(string),
  htmlfile(string),
}
```


## Web Interface
You can also convert your icons through this interface which is powered by an API using the same parsefont module
- Interface: [api.rexfont.com/parsefont](https://api.rexfont.com/parsefont)
- API repo: [parsefont_api](https://github.com/Rexfont/parsefont_api)

Brough to you by [REXFONT](https://rexfont.com)
