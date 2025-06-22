//Two functions to convert between RGB and Hex color codes

//============================================================ Rgb to Hex ============================================================

function rgbToHex(rgb){ //example color magenta rgb(255, 0, 255)

    //Validation
    let error = "Invalid rgb";
    let isValidRgb = rgb.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:\d+|\d*\.\d+))?\s*\)/gi) // regex to match rgba
    if(!isValidRgb){
        return error
    }

    let firstComma = rgb.indexOf(',')                       //rgb(255[,] 0, 255)
    let secondComma = rgb.indexOf(',', firstComma + 1)     //rgb(255, 0[,] 255)
    let roundBracketOpen = rgb.indexOf('(')                 //rgb[(]255, 0, 255)
    let roundBracketClose = rgb.indexOf(')')                //rgb(255, 0, 255[)]

    let rr = parseInt(rgb.slice(roundBracketOpen + 1, firstComma))      // rgb([255], 0, 255) red
    let gg = parseInt(rgb.slice(firstComma + 1, secondComma))           // rgb(255, [0], 255) green
    let bb = parseInt(rgb.slice(secondComma + 1, roundBracketClose))    // rgb(255, 0, [255]) blue

    if //if any (some) of the number is under 0 or over 255 it returns error
    (
        [rr, gg, bb].some(function(e){
            return e < 0 || e > 255
        })===true
    )
    {
        return error
    }

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

    hex = hex.replace("#", "") // removes #
    hex = hex.toLowerCase() // handles inconsistent input codes like #FF00ff

    //Validation
    let error = "Invalid hex"
    let isValidHex = hex.match(/^([0-9a-fA-F]{6})$/)
    let isValidHexShort = hex.match(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/)
    if(!isValidHex && !isValidHexShort){
        return error
    }

    if(hex.length===6){
        let r = hex.slice(0,2) // [ff]00ff red
        let g = hex.slice(2,4) // ff[00]ff green
        let b = hex.slice(4,6) // ff00[ff] blue

        let rgbArr = [r, g, b].map(function(color){
            let high = color.slice(0,1)
            let low = color.slice(1,2)

            let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

            high = hexDigits.indexOf(high)
            low = hexDigits.indexOf(low)
            
            return (high * 16) + (low * 1)
        })

        let rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`
        return rgb

    }else if(hex.length===3){ //magenta shorthand #f0f
        let r = hex.slice(0,1) // [f]0f red
        let g = hex.slice(1,2) // f[0]f green
        let b = hex.slice(2,3) // f0[f] blue
    
        let rgbArr = [r, g, b].map(function(color){
            let high = color
            let low

            let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

            high = hexDigits.indexOf(high)
            low = high  // shorthand hex works like that
            
            return high * 16 + low
        })

        let rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`
        return rgb
    }else{
        return error
    }
    
}

//============================================================ Test ============================================================

let magentaInHex = rgbToHex('rgba(255, 0, 255, 0.4)')
let magentaInRgb = hexToRgb('#FF00ff')
let magentaInRgbFromShorthandHex = hexToRgb('#f0f')

console.log(magentaInHex) // #ff00ff
console.log(magentaInRgb) // rgb(255, 0, 255)
console.log(magentaInRgbFromShorthandHex) // rgb(255, 0, 255)
//
const div1 = document.getElementById('a1')
const div2 = document.getElementById('a2')
const div3 = document.getElementById('a3')
//
div1.style.backgroundColor = magentaInHex
div2.style.backgroundColor = magentaInRgb
div3.style.backgroundColor = magentaInRgbFromShorthandHex
//
let colors = document.querySelectorAll('.color')
colors[0].textContent = magentaInHex
colors[1].textContent = magentaInRgb
colors[2].textContent = magentaInRgbFromShorthandHex