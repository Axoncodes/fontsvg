const axbuf = require('../helpers/bufferHandler');

function createScriptList() {

  let offset = 0
  let towrite;
  const buffer = Buffer.alloc(38);
  buffer.wui16(2);

  // script loop
  // loop1
  offset += 2;
  buffer.wui32(1145457748, offset);
  offset += 4;
  buffer.wui16(14, offset);
  // loop2
  offset += 2;
  buffer.wui32(1818326126, offset);
  offset += 4;
  buffer.wui16(26, offset);
  // loop done
  console.log(buffer);
  // script loop
  // loop1
  towrite = [0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
  offset += 2;
  buffer.set(towrite, offset, 6)
  offset += towrite.length;
  // loop2
  towrite = [0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
  buffer.set(towrite, offset, 6)
  offset += towrite.length;

  return { buffer, offset };

}

// GSUB()
function GSUB(font) {

  axbuf.init(84);

  // version
  axbuf.wui32(0x00010000);

  // offsets
  axbuf.wui16(10);
  axbuf.wui16(48);
  axbuf.wui16(62);

  // list contents
  axbuf.set([ 0, 2, 68, 70, 76, 84, 0, 14, 108, 97, 116, 110, 0, 26, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0])
  axbuf.set([ 0, 1, 108, 105, 103, 97, 0, 8, 0, 0, 0, 1, 0, 0 ])
  axbuf.set([ 0, 1, 0, 4, 0, 4, 0, 0, 0, 1, 0, 8, 0, 1, 0, 6, 0, 0, 0, 1, 0, 0 ])

  return axbuf.output();
}