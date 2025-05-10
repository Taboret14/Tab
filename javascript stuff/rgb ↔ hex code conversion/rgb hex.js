//Two functions to convert between RGB and Hex color codes

//============================================================ Rgb to Hex ============================================================

function rgbToHex(rgb){ //example color magenta rgb(255, 0, 255)

    let firstComma = rgb.indexOf(',')
    let secondComma = rgb.indexOf(',' , firstComma + 1)
    //
    let roundBracketOpen = rgb.indexOf('(')
    let roundBracketClose = rgb.indexOf(')')

    let rr = parseInt(rgb.slice(roundBracketOpen + 1, firstComma))      // rgb([255], 0, 255) red
    let gg = parseInt(rgb.slice(firstComma + 2, secondComma))           // rgb(255, [0], 255) green
    let bb = parseInt(rgb.slice(secondComma + 2, roundBracketClose))    // rgb(255, 0, [255]) blue

    parseInt(rr, gg, bb)
    let hexArr = [rr, gg, bb].map(function(color){
        let high = Math.floor(color/16)
        let low = color%16

        let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

        high = hexDigits[high]
        low = hexDigits[low]

        return high + low
    })

    let hex = `#${hexArr[0]}${hexArr[1]}${hexArr[2]}`
    return hex
}

//============================================================ Hex to Rgb ============================================================

function hexToRgb(hex){ //example color magenta #ff00ff

    hex = hex.replace("#", "").toLowerCase() // removes #
    let r = hex.slice(0,2) // [ff]00ff red
    let g = hex.slice(2,4) // ff[00]ff green
    let b = hex.slice(4,6) // ff00[ff] blue

    let rgbArr = [r, g, b].map(function(color){
        let high = color.slice(0,1)
        let low = color.slice(1,2)
        let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        
        high = hexDigits.indexOf(high)
        low = hexDigits.indexOf(low)
        
        return high * 16 + low * 1
    })

    let rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`
    return rgb
}

let MagentaInRgb = hexToRgb('#ff00ff')
let MagentaInHex = rgbToHex('rgb(255, 0, 255)')

//============================================================ Test ============================================================

console.log(MagentaInRgb) // rgb(255, 0, 255)
console.log(MagentaInHex) // #ff00ff
//
const div1 = document.getElementById('1')
const div2 = document.getElementById('2')
//
div1.style.backgroundColor = MagentaInRgb
div2.style.backgroundColor = MagentaInHex
//
div1.textContent = MagentaInRgb
div2.textContent = MagentaInHex
