const _ = require('lodash');
const axbuf = require('./bufferHandler');

function OS2(font) {

  axbuf.init(96);
  axbuf.wui16(4); // version
  axbuf.wi16(font.avgWidth); // xAvgCharWidth
  axbuf.wui16(font.weightClass); // usWeightClass
  axbuf.wui16(font.widthClass); // usWidthClass
  axbuf.wi16(font.fsType); // fsType
  axbuf.wi16(font.ySubscriptXSize); // ySubscriptXSize
  axbuf.wi16(font.ySubscriptYSize); //ySubscriptYSize
  axbuf.wi16(font.ySubscriptXOffset); // ySubscriptXOffset
  axbuf.wi16(font.ySubscriptYOffset); // ySubscriptYOffset
  axbuf.wi16(font.ySuperscriptXSize); // ySuperscriptXSize
  axbuf.wi16(font.ySuperscriptYSize); // ySuperscriptYSize
  axbuf.wi16(font.ySuperscriptXOffset); // ySuperscriptXOffset
  axbuf.wi16(font.ySuperscriptYOffset); // ySuperscriptYOffset
  axbuf.wi16(font.yStrikeoutSize); // yStrikeoutSize
  axbuf.wi16(font.yStrikeoutPosition); // yStrikeoutPosition
  axbuf.wi16(font.familyClass); // sFamilyClass
  axbuf.wui8(font.panose.familyType); // panose.bFamilyType
  axbuf.wui8(font.panose.serifStyle); // panose.bSerifStyle
  axbuf.wui8(font.panose.weight); // panose.bWeight
  axbuf.wui8(font.panose.proportion); // panose.bProportion
  axbuf.wui8(font.panose.contrast); // panose.bContrast
  axbuf.wui8(font.panose.strokeVariation); // panose.bStrokeVariation
  axbuf.wui8(font.panose.armStyle); // panose.bArmStyle
  axbuf.wui8(font.panose.letterform); // panose.bLetterform
  axbuf.wui8(font.panose.midline); // panose.bMidline
  axbuf.wui8(font.panose.xHeight); // panose.bXHeight
  // TODO: This field is used to specify the Unicode blocks or ranges based on the 'cmap' table.
  axbuf.wui32(0); // ulUnicodeRange1
  axbuf.wui32(0); // ulUnicodeRange2
  axbuf.wui32(0); // ulUnicodeRange3
  axbuf.wui32(0); // ulUnicodeRange4
  axbuf.wui32(1348879716); // achVendID, equal to PfEd
  axbuf.wui16(font.fsSelection); // fsSelection
  axbuf.wui16(getFirstCharIndex(font)); // usFirstCharIndex
  axbuf.wui16(getLastCharIndex(font)); // usLastCharIndex
  axbuf.wi16(font.ascent); // sTypoAscender
  axbuf.wi16(font.descent); // sTypoDescender
  axbuf.wi16(font.lineGap); // lineGap
  // Enlarge win acscent/descent to avoid clipping
  // WinAscent - WinDecent should at least be equal to TypoAscender - TypoDescender + TypoLineGap:
  // https://www.high-logic.com/font-editor/fontcreator/tutorials/font-metrics-vertical-line-spacing
  axbuf.wi16(Math.max(font.yMax, font.ascent + font.lineGap)); // usWinAscent
  axbuf.wi16(-Math.min(font.yMin, font.descent)); // usWinDescent
  axbuf.wi32(1); // ulCodePageRange1, Latin 1
  axbuf.wi32(0); // ulCodePageRange2
  axbuf.wi16(font.xHeight); // sxHeight
  axbuf.wi16(font.capHeight); // sCapHeight
  axbuf.wui16(0); // usDefaultChar, pointing to missing glyph (always id=0)
  axbuf.wui16(0); // usBreakChar, code=32 isn't guaranteed to be a space in icon fonts
  axbuf.wui16(maxContext(font)); // usMaxContext, use at least 2 for ligatures and kerning

  return axbuf.output();
}

//get first glyph unicode
function getFirstCharIndex(font) {
  return Math.max(0, Math.min(0xffff, Math.abs(_.minBy(Object.keys(font.codePoints), function (point) {
    return parseInt(point, 10);
  }))));
}

//get last glyph unicode
function getLastCharIndex(font) {
  return Math.max(0, Math.min(0xffff, Math.abs(_.maxBy(Object.keys(font.codePoints), function (point) {
    return parseInt(point, 10);
  }))));
}

// use at least 2 for ligatures and kerning
function maxContext(font) {
    return font.ligatures.map(l => l.unicode.length)
    .reduce((a, b) => Math.max(a, b), 2);
}





// OS2({
//   ascent: 1874,
//   copyright: undefined,
//   createdDate: {
//   },
//   glyphs: [
//     {
//       contours: [
//       ],
//       d: "",
//       id: 0,
//       codes: [
//       ],
//       height: 1874,
//       name: "",
//       width: 0,
//       ttfContours: [
//       ],
//     },
//     {
//       contours: [
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3892.81,
//               y: 422.28,
//             },
//             {
//               onCurve: true,
//               x: 3664.45,
//               y: 422.28,
//             },
//             {
//               onCurve: false,
//               x: 3657.1167030462134,
//               y: 422.2758533792975,
//             },
//             {
//               onCurve: true,
//               x: 3651.9312782127545,
//               y: 427.46127821275513,
//             },
//             {
//               onCurve: false,
//               x: 3646.745853379298,
//               y: 432.646703046213,
//             },
//             {
//               onCurve: true,
//               x: 3646.75,
//               y: 439.97999999999985,
//             },
//             {
//               onCurve: true,
//               x: 3646.75,
//               y: 1430,
//             },
//             {
//               onCurve: false,
//               x: 3646.7458533792988,
//               y: 1437.3332969537894,
//             },
//             {
//               onCurve: true,
//               x: 3651.9312782127554,
//               y: 1442.5187217872472,
//             },
//             {
//               onCurve: false,
//               x: 3657.116703046215,
//               y: 1447.7041466207036,
//             },
//             {
//               onCurve: true,
//               x: 3664.4500000000016,
//               y: 1447.7000000000003,
//             },
//             {
//               onCurve: true,
//               x: 3892.81,
//               y: 1447.7000000000003,
//             },
//             {
//               onCurve: false,
//               x: 3927.482102422007,
//               y: 1447.700000989354,
//             },
//             {
//               onCurve: true,
//               x: 3952.0019097749764,
//               y: 1423.1860512110038,
//             },
//             {
//               onCurve: false,
//               x: 3976.5217171279455,
//               y: 1398.672101432654,
//             },
//             {
//               onCurve: true,
//               x: 3976.53,
//               y: 1363.9999999999998,
//             },
//             {
//               onCurve: true,
//               x: 3976.53,
//               y: 506,
//             },
//             {
//               onCurve: false,
//               x: 3976.53,
//               y: 471.32204055812406,
//             },
//             {
//               onCurve: true,
//               x: 3952.00897972094,
//               y: 446.8010202790619,
//             },
//             {
//               onCurve: false,
//               x: 3927.4879594418753,
//               y: 422.27999999999975,
//             },
//             {
//               onCurve: true,
//               x: 3892.810000000002,
//               y: 422.2800000000003,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 1620.34,
//             },
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 249.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 263.4400000000001,
//               y: 249.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 263.4400000000001,
//               y: 1620.34,
//             },
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 1620.34,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 1860.34,
//             },
//             {
//               onCurve: true,
//               x: 208,
//               y: 1860.34,
//             },
//             {
//               onCurve: false,
//               x: 158.0922039736731,
//               y: 1860.34,
//             },
//             {
//               onCurve: true,
//               x: 115.05481481481482,
//               y: 1835.0614814814815,
//             },
//             {
//               onCurve: false,
//               x: 73.29572751136502,
//               y: 1810.5337886462987,
//             },
//             {
//               onCurve: true,
//               x: 48.765185185185146,
//               y: 1768.7785185185185,
//             },
//             {
//               onCurve: false,
//               x: 23.479999999999944,
//               y: 1725.7387143592937,
//             },
//             {
//               onCurve: true,
//               x: 23.479999999999905,
//               y: 1675.82,
//             },
//             {
//               onCurve: true,
//               x: 23.479999999999905,
//               y: 194.1800000000001,
//             },
//             {
//               onCurve: false,
//               x: 23.48,
//               y: 144.27664841811745,
//             },
//             {
//               onCurve: true,
//               x: 48.758518518518514,
//               y: 101.23925925925938,
//             },
//             {
//               onCurve: false,
//               x: 73.28668223776089,
//               y: 59.479370262446295,
//             },
//             {
//               onCurve: true,
//               x: 115.04148148148148,
//               y: 34.94740740740758,
//             },
//             {
//               onCurve: false,
//               x: 158.08209041806313,
//               y: 9.660000000000187,
//             },
//             {
//               onCurve: true,
//               x: 208,
//               y: 9.660000000000224,
//             },
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 9.660000000000224,
//             },
//             {
//               onCurve: false,
//               x: 3404.8277960263276,
//               y: 9.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 3447.8651851851855,
//               y: 34.93851851851861,
//             },
//             {
//               onCurve: false,
//               x: 3489.6242724886347,
//               y: 59.46621135370078,
//             },
//             {
//               onCurve: true,
//               x: 3514.1548148148154,
//               y: 101.22148148148156,
//             },
//             {
//               onCurve: false,
//               x: 3539.4400000000005,
//               y: 144.26128564070672,
//             },
//             {
//               onCurve: true,
//               x: 3539.4400000000014,
//               y: 194.1800000000001,
//             },
//             {
//               onCurve: true,
//               x: 3539.4400000000014,
//               y: 1675.82,
//             },
//             {
//               onCurve: false,
//               x: 3539.4400000000005,
//               y: 1725.7233515818818,
//             },
//             {
//               onCurve: true,
//               x: 3514.1614814814816,
//               y: 1768.7607407407406,
//             },
//             {
//               onCurve: false,
//               x: 3489.6333177622396,
//               y: 1810.5206297375541,
//             },
//             {
//               onCurve: true,
//               x: 3447.8785185185184,
//               y: 1835.0525925925926,
//             },
//             {
//               onCurve: false,
//               x: 3404.8379095819373,
//               y: 1860.3400000000006,
//             },
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 1860.3400000000004,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 433.56,
//               y: 1447.72,
//             },
//             {
//               onCurve: true,
//               x: 2451.5499999999997,
//               y: 1447.72,
//             },
//             {
//               onCurve: false,
//               x: 2464.16280297426,
//               y: 1447.72,
//             },
//             {
//               onCurve: true,
//               x: 2473.08140148713,
//               y: 1438.80140148713,
//             },
//             {
//               onCurve: false,
//               x: 2481.9999999999995,
//               y: 1429.88280297426,
//             },
//             {
//               onCurve: true,
//               x: 2481.9999999999995,
//               y: 1417.2699999999988,
//             },
//             {
//               onCurve: true,
//               x: 2481.9999999999995,
//               y: 452.72,
//             },
//             {
//               onCurve: false,
//               x: 2482,
//               y: 440.10719702573937,
//             },
//             {
//               onCurve: true,
//               x: 2473.08140148713,
//               y: 431.1885985128697,
//             },
//             {
//               onCurve: false,
//               x: 2464.16280297426,
//               y: 422.2700000000001,
//             },
//             {
//               onCurve: true,
//               x: 2451.5499999999993,
//               y: 422.27000000000015,
//             },
//             {
//               onCurve: true,
//               x: 433.56,
//               y: 422.27000000000015,
//             },
//             {
//               onCurve: false,
//               x: 420.9471970257393,
//               y: 422.2699999999999,
//             },
//             {
//               onCurve: true,
//               x: 412.02859851286956,
//               y: 431.1885985128695,
//             },
//             {
//               onCurve: false,
//               x: 403.1100000000001,
//               y: 440.1071970257393,
//             },
//             {
//               onCurve: true,
//               x: 403.10999999999973,
//               y: 452.72000000000037,
//             },
//             {
//               onCurve: true,
//               x: 403.10999999999973,
//               y: 1417.27,
//             },
//             {
//               onCurve: false,
//               x: 403.11,
//               y: 1429.8828029742608,
//             },
//             {
//               onCurve: true,
//               x: 412.02859851286956,
//               y: 1438.8014014871283,
//             },
//             {
//               onCurve: false,
//               x: 420.9471970257394,
//               y: 1447.7200000000003,
//             },
//             {
//               onCurve: true,
//               x: 433.5600000000004,
//               y: 1447.72,
//             },
//           ],
//         },
//       ],
//       d: "M3892.81 422.28H3664.45A17.69 17.69 0 0 0 3646.75 439.98V1430A17.69 17.69 0 0 0 3664.45 1447.7H3892.81A83.72 83.72 0 0 0 3976.53 1364V506A83.72 83.72 0 0 0 3892.81 422.28zM3299.44 1620.34V249.6600000000001H263.4400000000001V1620.34H3299.44M3354.92 1860.34H208C106.51 1860.34 23.48 1777.34 23.48 1675.82V194.1800000000001C23.48 92.7000000000001 106.48 9.6600000000001 208 9.6600000000001H3354.92C3456.41 9.6600000000001 3539.44 92.6600000000001 3539.44 194.1800000000001V1675.82C3539.44 1777.3 3456.44 1860.34 3354.92 1860.34zM433.56 1447.72H2451.5499999999997A30.45 30.45 0 0 0 2481.9999999999995 1417.27V452.72A30.45 30.45 0 0 0 2451.5499999999997 422.27H433.56A30.45 30.45 0 0 0 403.11 452.72V1417.27A30.45 30.45 0 0 0 433.56 1447.72z",
//       id: 1,
//       codes: [
//         57345,
//       ],
//       height: 1874,
//       name: "icon1",
//       width: 4000,
//       ttfContours: [
//         [
//           {
//             x: 3893,
//             y: 422,
//             onCurve: true,
//           },
//           {
//             x: -229,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -7,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -10,
//             y: 11,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 7,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 990,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 7,
//             onCurve: false,
//           },
//           {
//             x: 10,
//             y: 11,
//             onCurve: false,
//           },
//           {
//             x: 7,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 229,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 34,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -35,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -858,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -35,
//             onCurve: false,
//           },
//           {
//             x: -50,
//             y: -49,
//             onCurve: false,
//           },
//         ],
//         [
//           {
//             x: -628,
//             y: 1198,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -1370,
//             onCurve: true,
//           },
//           {
//             x: -3036,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 1370,
//             onCurve: true,
//           },
//         ],
//         [
//           {
//             x: 3092,
//             y: 240,
//             onCurve: true,
//           },
//           {
//             x: -3147,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -50,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -85,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: -50,
//             y: -85,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -50,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -1482,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -50,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: -85,
//             onCurve: false,
//           },
//           {
//             x: 85,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 3147,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 50,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 85,
//             y: 49,
//             onCurve: false,
//           },
//           {
//             x: 49,
//             y: 85,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 50,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 1482,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 50,
//             onCurve: false,
//           },
//           {
//             x: -49,
//             y: 85,
//             onCurve: false,
//           },
//           {
//             x: -85,
//             y: 49,
//             onCurve: false,
//           },
//         ],
//         [
//           {
//             x: -2971,
//             y: -412,
//             onCurve: true,
//           },
//           {
//             x: 2018,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 12,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 18,
//             y: -18,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -13,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -964,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -13,
//             onCurve: false,
//           },
//           {
//             x: -18,
//             y: -18,
//             onCurve: false,
//           },
//           {
//             x: -12,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -2018,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -13,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -18,
//             y: 18,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 13,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 964,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 13,
//             onCurve: false,
//           },
//           {
//             x: 18,
//             y: 18,
//             onCurve: false,
//           },
//         ],
//       ],
//     },
//   ],
//   ligatures: [
//   ],
//   codePoints: {
//     "57345": {
//       contours: [
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3892.81,
//               y: 422.28,
//             },
//             {
//               onCurve: true,
//               x: 3664.45,
//               y: 422.28,
//             },
//             {
//               onCurve: false,
//               x: 3657.1167030462134,
//               y: 422.2758533792975,
//             },
//             {
//               onCurve: true,
//               x: 3651.9312782127545,
//               y: 427.46127821275513,
//             },
//             {
//               onCurve: false,
//               x: 3646.745853379298,
//               y: 432.646703046213,
//             },
//             {
//               onCurve: true,
//               x: 3646.75,
//               y: 439.97999999999985,
//             },
//             {
//               onCurve: true,
//               x: 3646.75,
//               y: 1430,
//             },
//             {
//               onCurve: false,
//               x: 3646.7458533792988,
//               y: 1437.3332969537894,
//             },
//             {
//               onCurve: true,
//               x: 3651.9312782127554,
//               y: 1442.5187217872472,
//             },
//             {
//               onCurve: false,
//               x: 3657.116703046215,
//               y: 1447.7041466207036,
//             },
//             {
//               onCurve: true,
//               x: 3664.4500000000016,
//               y: 1447.7000000000003,
//             },
//             {
//               onCurve: true,
//               x: 3892.81,
//               y: 1447.7000000000003,
//             },
//             {
//               onCurve: false,
//               x: 3927.482102422007,
//               y: 1447.700000989354,
//             },
//             {
//               onCurve: true,
//               x: 3952.0019097749764,
//               y: 1423.1860512110038,
//             },
//             {
//               onCurve: false,
//               x: 3976.5217171279455,
//               y: 1398.672101432654,
//             },
//             {
//               onCurve: true,
//               x: 3976.53,
//               y: 1363.9999999999998,
//             },
//             {
//               onCurve: true,
//               x: 3976.53,
//               y: 506,
//             },
//             {
//               onCurve: false,
//               x: 3976.53,
//               y: 471.32204055812406,
//             },
//             {
//               onCurve: true,
//               x: 3952.00897972094,
//               y: 446.8010202790619,
//             },
//             {
//               onCurve: false,
//               x: 3927.4879594418753,
//               y: 422.27999999999975,
//             },
//             {
//               onCurve: true,
//               x: 3892.810000000002,
//               y: 422.2800000000003,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 1620.34,
//             },
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 249.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 263.4400000000001,
//               y: 249.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 263.4400000000001,
//               y: 1620.34,
//             },
//             {
//               onCurve: true,
//               x: 3299.44,
//               y: 1620.34,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 1860.34,
//             },
//             {
//               onCurve: true,
//               x: 208,
//               y: 1860.34,
//             },
//             {
//               onCurve: false,
//               x: 158.0922039736731,
//               y: 1860.34,
//             },
//             {
//               onCurve: true,
//               x: 115.05481481481482,
//               y: 1835.0614814814815,
//             },
//             {
//               onCurve: false,
//               x: 73.29572751136502,
//               y: 1810.5337886462987,
//             },
//             {
//               onCurve: true,
//               x: 48.765185185185146,
//               y: 1768.7785185185185,
//             },
//             {
//               onCurve: false,
//               x: 23.479999999999944,
//               y: 1725.7387143592937,
//             },
//             {
//               onCurve: true,
//               x: 23.479999999999905,
//               y: 1675.82,
//             },
//             {
//               onCurve: true,
//               x: 23.479999999999905,
//               y: 194.1800000000001,
//             },
//             {
//               onCurve: false,
//               x: 23.48,
//               y: 144.27664841811745,
//             },
//             {
//               onCurve: true,
//               x: 48.758518518518514,
//               y: 101.23925925925938,
//             },
//             {
//               onCurve: false,
//               x: 73.28668223776089,
//               y: 59.479370262446295,
//             },
//             {
//               onCurve: true,
//               x: 115.04148148148148,
//               y: 34.94740740740758,
//             },
//             {
//               onCurve: false,
//               x: 158.08209041806313,
//               y: 9.660000000000187,
//             },
//             {
//               onCurve: true,
//               x: 208,
//               y: 9.660000000000224,
//             },
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 9.660000000000224,
//             },
//             {
//               onCurve: false,
//               x: 3404.8277960263276,
//               y: 9.6600000000001,
//             },
//             {
//               onCurve: true,
//               x: 3447.8651851851855,
//               y: 34.93851851851861,
//             },
//             {
//               onCurve: false,
//               x: 3489.6242724886347,
//               y: 59.46621135370078,
//             },
//             {
//               onCurve: true,
//               x: 3514.1548148148154,
//               y: 101.22148148148156,
//             },
//             {
//               onCurve: false,
//               x: 3539.4400000000005,
//               y: 144.26128564070672,
//             },
//             {
//               onCurve: true,
//               x: 3539.4400000000014,
//               y: 194.1800000000001,
//             },
//             {
//               onCurve: true,
//               x: 3539.4400000000014,
//               y: 1675.82,
//             },
//             {
//               onCurve: false,
//               x: 3539.4400000000005,
//               y: 1725.7233515818818,
//             },
//             {
//               onCurve: true,
//               x: 3514.1614814814816,
//               y: 1768.7607407407406,
//             },
//             {
//               onCurve: false,
//               x: 3489.6333177622396,
//               y: 1810.5206297375541,
//             },
//             {
//               onCurve: true,
//               x: 3447.8785185185184,
//               y: 1835.0525925925926,
//             },
//             {
//               onCurve: false,
//               x: 3404.8379095819373,
//               y: 1860.3400000000006,
//             },
//             {
//               onCurve: true,
//               x: 3354.92,
//               y: 1860.3400000000004,
//             },
//           ],
//         },
//         {
//           points: [
//             {
//               onCurve: true,
//               x: 433.56,
//               y: 1447.72,
//             },
//             {
//               onCurve: true,
//               x: 2451.5499999999997,
//               y: 1447.72,
//             },
//             {
//               onCurve: false,
//               x: 2464.16280297426,
//               y: 1447.72,
//             },
//             {
//               onCurve: true,
//               x: 2473.08140148713,
//               y: 1438.80140148713,
//             },
//             {
//               onCurve: false,
//               x: 2481.9999999999995,
//               y: 1429.88280297426,
//             },
//             {
//               onCurve: true,
//               x: 2481.9999999999995,
//               y: 1417.2699999999988,
//             },
//             {
//               onCurve: true,
//               x: 2481.9999999999995,
//               y: 452.72,
//             },
//             {
//               onCurve: false,
//               x: 2482,
//               y: 440.10719702573937,
//             },
//             {
//               onCurve: true,
//               x: 2473.08140148713,
//               y: 431.1885985128697,
//             },
//             {
//               onCurve: false,
//               x: 2464.16280297426,
//               y: 422.2700000000001,
//             },
//             {
//               onCurve: true,
//               x: 2451.5499999999993,
//               y: 422.27000000000015,
//             },
//             {
//               onCurve: true,
//               x: 433.56,
//               y: 422.27000000000015,
//             },
//             {
//               onCurve: false,
//               x: 420.9471970257393,
//               y: 422.2699999999999,
//             },
//             {
//               onCurve: true,
//               x: 412.02859851286956,
//               y: 431.1885985128695,
//             },
//             {
//               onCurve: false,
//               x: 403.1100000000001,
//               y: 440.1071970257393,
//             },
//             {
//               onCurve: true,
//               x: 403.10999999999973,
//               y: 452.72000000000037,
//             },
//             {
//               onCurve: true,
//               x: 403.10999999999973,
//               y: 1417.27,
//             },
//             {
//               onCurve: false,
//               x: 403.11,
//               y: 1429.8828029742608,
//             },
//             {
//               onCurve: true,
//               x: 412.02859851286956,
//               y: 1438.8014014871283,
//             },
//             {
//               onCurve: false,
//               x: 420.9471970257394,
//               y: 1447.7200000000003,
//             },
//             {
//               onCurve: true,
//               x: 433.5600000000004,
//               y: 1447.72,
//             },
//           ],
//         },
//       ],
//       d: "M3892.81 422.28H3664.45A17.69 17.69 0 0 0 3646.75 439.98V1430A17.69 17.69 0 0 0 3664.45 1447.7H3892.81A83.72 83.72 0 0 0 3976.53 1364V506A83.72 83.72 0 0 0 3892.81 422.28zM3299.44 1620.34V249.6600000000001H263.4400000000001V1620.34H3299.44M3354.92 1860.34H208C106.51 1860.34 23.48 1777.34 23.48 1675.82V194.1800000000001C23.48 92.7000000000001 106.48 9.6600000000001 208 9.6600000000001H3354.92C3456.41 9.6600000000001 3539.44 92.6600000000001 3539.44 194.1800000000001V1675.82C3539.44 1777.3 3456.44 1860.34 3354.92 1860.34zM433.56 1447.72H2451.5499999999997A30.45 30.45 0 0 0 2481.9999999999995 1417.27V452.72A30.45 30.45 0 0 0 2451.5499999999997 422.27H433.56A30.45 30.45 0 0 0 403.11 452.72V1417.27A30.45 30.45 0 0 0 433.56 1447.72z",
//       id: 1,
//       codes: [
//         57345,
//       ],
//       height: 1874,
//       name: "icon1",
//       width: 4000,
//       ttfContours: [
//         [
//           {
//             x: 3893,
//             y: 422,
//             onCurve: true,
//           },
//           {
//             x: -229,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -7,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -10,
//             y: 11,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 7,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 990,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 7,
//             onCurve: false,
//           },
//           {
//             x: 10,
//             y: 11,
//             onCurve: false,
//           },
//           {
//             x: 7,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 229,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 34,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -35,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -858,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -35,
//             onCurve: false,
//           },
//           {
//             x: -50,
//             y: -49,
//             onCurve: false,
//           },
//         ],
//         [
//           {
//             x: -628,
//             y: 1198,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -1370,
//             onCurve: true,
//           },
//           {
//             x: -3036,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 1370,
//             onCurve: true,
//           },
//         ],
//         [
//           {
//             x: 3092,
//             y: 240,
//             onCurve: true,
//           },
//           {
//             x: -3147,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -50,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -85,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: -50,
//             y: -85,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -50,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -1482,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -50,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: -85,
//             onCurve: false,
//           },
//           {
//             x: 85,
//             y: -49,
//             onCurve: false,
//           },
//           {
//             x: 50,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 3147,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 50,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 85,
//             y: 49,
//             onCurve: false,
//           },
//           {
//             x: 49,
//             y: 85,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 50,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 1482,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 50,
//             onCurve: false,
//           },
//           {
//             x: -49,
//             y: 85,
//             onCurve: false,
//           },
//           {
//             x: -85,
//             y: 49,
//             onCurve: false,
//           },
//         ],
//         [
//           {
//             x: -2971,
//             y: -412,
//             onCurve: true,
//           },
//           {
//             x: 2018,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: 12,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: 18,
//             y: -18,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: -13,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -964,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: -13,
//             onCurve: false,
//           },
//           {
//             x: -18,
//             y: -18,
//             onCurve: false,
//           },
//           {
//             x: -12,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -2018,
//             y: 0,
//             onCurve: true,
//           },
//           {
//             x: -13,
//             y: 0,
//             onCurve: false,
//           },
//           {
//             x: -18,
//             y: 18,
//             onCurve: false,
//           },
//           {
//             x: 0,
//             y: 13,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 964,
//             onCurve: true,
//           },
//           {
//             x: 0,
//             y: 13,
//             onCurve: false,
//           },
//           {
//             x: 18,
//             y: 18,
//             onCurve: false,
//           },
//         ],
//       ],
//     },
//   },
//   isFixedPitch: 0,
//   italicAngle: 0,
//   familyClass: 0,
//   familyName: "hello",
//   fsSelection: 192,
//   fsType: 0,
//   lowestRecPPEM: 8,
//   macStyle: 0,
//   modifiedDate: {
//   },
//   panose: {
//     familyType: 2,
//     serifStyle: 0,
//     weight: 5,
//     proportion: 3,
//     contrast: 0,
//     strokeVariation: 0,
//     armStyle: 0,
//     letterform: 0,
//     midline: 0,
//     xHeight: 0,
//   },
//   revision: 1,
//   sfntNames: [
//     {
//       id: 2,
//       value: "Regular",
//     },
//     {
//       id: 4,
//       value: "hello",
//     },
//     {
//       id: 5,
//       value: "Version 1.0",
//     },
//     {
//       id: 6,
//       value: "hello",
//     },
//   ],
//   underlineThickness: 0,
//   unitsPerEm: 1874,
//   weightClass: 400,
//   width: 4000,
//   widthClass: 5,
//   ySubscriptXOffset: 0,
//   ySuperscriptXOffset: 0,
//   int_descent: 0,
//   xHeight: 0,
//   capHeight: 0,
//   avgCharWidth: 2000,
//   id: "hello",
//   description: "Generated by svg2ttf from Fontello project.",
//   url: "http://fontello.com",
//   horizOriginX: 0,
//   horizOriginY: 0,
//   vertOriginX: 0,
//   vertOriginY: 0,
//   height: 1874,
//   avgWidth: 2000,
//   ySubscriptXSize: 2538,
//   ySubscriptYSize: 1311,
//   ySubscriptYOffset: 262,
//   ySuperscriptXSize: 2538,
//   ySuperscriptYSize: 1311,
//   ySuperscriptYOffset: 899,
//   yStrikeoutSize: 91,
//   yStrikeoutPosition: 483,
//   descent: 0,
//   lineGap: 168
// })
