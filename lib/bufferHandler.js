const { Buffer } = require('buffer');

var offset = 0;
var mainBuffer;

module.exports = {
  init: length => (
    mainBuffer = 0,
    offset = 0,
    mainBuffer = Buffer.alloc(length)
  ),

  getOffset: () => offset,

  output: () => mainBuffer,

  wui8: buffer => (
    mainBuffer.writeUInt8(buffer, offset),
    offset += 1
  ),

  wui16: buffer => (
    mainBuffer.writeUInt16BE(buffer, offset),
    offset += 2
  ),

  wui32: buffer => (
    mainBuffer.writeUInt32BE(buffer, offset),
    offset += 4
  ),

  wi8: buffer => (
    mainBuffer.writeInt8BE(buffer, offset),
    offset += 1
  ),

  wi16: buffer => (
    mainBuffer.writeInt16BE(buffer, offset),
    offset += 2
  ),

  wi32: buffer => (
    mainBuffer.writeInt32BE(buffer, offset),
    offset += 4
  ),

  set: arr => (
    mainBuffer.set(arr, offset, 6),
    offset += arr.length
  ),

  
}