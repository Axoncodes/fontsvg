const axbuf = require('./bufferHandler');

GLYPH()
function GLYPH(font) {
  axbuf.init(172)

  font.glyphs.forEach(glyph => {

    // Ignore glyphs without outlines. These will get a length of zero in the “loca” table
    if(!glyph.contours.length) return;

    var tmpOffset = axbuf.getOffset()

    const { xMin, yMin, xMax, yMax, ttfContours:contours, ttf_flags:flags, ttf_x:xs, ttf_y:ys } = glyph;

    axbuf.wi16(glyph.contours.length)
    axbuf.wi16(xMin)
    axbuf.wi16(yMin)
    axbuf.wi16(xMax)
    axbuf.wi16(yMax)

    let endPtsOfContours = -1;
    contours.forEach(contour => {
      endPtsOfContours += contour.length
      axbuf.wi16(endPtsOfContours)
    })

    axbuf.wi16(0)

    flags.forEach(flag => {
      axbuf.wi8(flag)
    })

    xs.forEach(x => {
      -0xFF <= x && x <= 0xFF
      ? axbuf.wui8(Math.abs(x))
      : axbuf.wi16(x)
    })

    ys.forEach(y => {
      -0xFF <= y && y <= 0xFF
      ? axbuf.wui8(Math.abs(y))
      : axbuf.wi16(y)
    })

    var tail = (axbuf.getOffset() - tmpOffset) % 4
    
    // glyph size must be divisible by 4.
    if (tail !== 0)
    for (; tail < 4; tail++)
    axbuf.wui8(0);

    return axbuf.output()
  })
}