//Two functions to convert between RGB and Hex color codes

//============================================================ Rgb to Hex ============================================================

function rgbToHex(rgb, /*optional options object*/ {noHashtag = false, print = null} = {}){ //example color magenta rgb(255, 0, 255)

    // Print code
    let printText = rgb
 
    // Validation regex
    let errorRgb = "Invalid rgb";
    let errorRgba = "Invalid rgba";
    let errorType = "Invalid type";
    let isValidRgb = rgb.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/) // regex to match rgb
    let isValidRgba = rgb.match(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(\d+|\d*\.\d+)\s*\)/) // regex to match rgba

    // Errors
    // String check
    if(typeof(rgb) !== 'string'){
        print.textContent = printText
        return errorType
    }

    //Rgb
    if(rgb.startsWith('rgb(')){
        if(!isValidRgb){
            print.textContent = printText
            return errorRgb
        }
    }else if(rgb.startsWith('rgba(')){
        if(!isValidRgba){
            print.textContent = printText
            return errorRgba
        }
    }else{
        print.textContent = printText
        return 'Error'
    }

    // Commas and parenthesis
    let firstComma = rgb.indexOf(',')                       // rgb(255[,] 0, 255)
    let secondComma = rgb.indexOf(',', firstComma + 1)     //rgb(255, 0[,] 255)
    let roundBracketOpen = rgb.indexOf('(')                 //rgb[(]255, 0, 255)
    let roundBracketClose = rgb.indexOf(')')                //rgb(255, 0, 255[)]

    // Rgb values
    let rr = parseInt(rgb.slice(roundBracketOpen + 1, firstComma))      // rgb([255], 0, 255) red
    let gg = parseInt(rgb.slice(firstComma + 1, secondComma))           // rgb(255, [0], 255) green
    let bb = parseInt(rgb.slice(secondComma + 1, roundBracketClose))    // rgb(255, 0, [255]) blue

    let thirdComma, alpha, isRgba

    if(rgb.indexOf(',', secondComma + 1) === -1){
        isRgba = false
    }else{
        isRgba = true
    }

    // If it's rgba sets blue properly and alpha value
    if(isRgba){
        thirdComma = rgb.indexOf(',', secondComma + 1) // rgba(255, 0, 255[,]0.1)
        bb = parseInt(rgb.slice(secondComma + 1, thirdComma)) // rgba(255, 0, [255], 0.1) blue
        alpha = rgb.slice(thirdComma + 1, roundBracketClose) // rgba(255, 0, 255, [0.1]) alpha value
    }

    if // If any(some) of the values is under 0 or over 255 it returns error
(
        [rr, gg, bb].some(function(e){
            return e < 0 || e > 255
        })===true
    )
{
        print.textContent = printText
        if(isRgba){
            return errorRgba
        }else{
            return errorRgb
        }
    }

    // If alpha is under 0 or over 1 it returns error
    if(isRgba){
        if(alpha > 1 || alpha < 0){
            print.textContent = printText
            return 'Invalid rgba'
        }
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

    
    if(noHashtag){
        hex = hex.slice(1, hex.length)
    }

    if(print){
        print.textContent = printText
    }

    return hex

}

//============================================================ Hex to Rgb ============================================================

function hexToRgb(hex, /*optional options object*/ {noBrackets = false, print = null} = {}){ // example color magenta #ff00ff

    let printText = hex
    let rgb
    let noBracketsRgb

    hex = hex.replace("#", "") // removes #
    hex = hex.toLowerCase() // handles inconsistent input codes like #FF00ff

    // Errors
    //Validation regex
    let error = "Invalid hex"
    let isValidHex = hex.match(/^([0-9a-fA-F]{6})$/)
    let isValidHexShort = hex.match(/^([0-9a-fA-F]{3})$/)

    // String check

    if(!isValidHex && !isValidHexShort || typeof hex !== 'string'){
        print.textContent = printText
        return error
    }

    if(hex.length === 6){
        let r = hex.slice(0,2) // [ff]00ff red
        let g = hex.slice(2,4) // ff[00]ff green
        let b = hex.slice(4,6) // ff00[ff] blue

        let rgbArr = [r, g, b].map(function(color){
            let high = color.slice(0,1)
            let low = color.slice(1,2)

            let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

            high = hexDigits.indexOf(high)
            low = hexDigits.indexOf(low)
            
            return(high * 16) +(low * 1)
        })

        noBracketsRgb = `${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}`

        rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`

    }else if(hex.length === 3){ // magenta shorthand #f0f
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

        noBracketsRgb = `${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}`

        rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`
    }

    if(noBrackets){
        rgb = noBracketsRgb
    }

    if(print){
        print.textContent = printText
    }   

    return rgb;
}

//============================================================ Test ============================================================

// Html elements
const from = document.querySelectorAll('.from')
const to = document.querySelectorAll('.to')
const boxes = document.querySelectorAll('.container')

// Rgb
let magentaInHex1 = rgbToHex('rgb(255, 0, 255)', {print: from[0]})
// Rgba
let magentaInHex2 = rgbToHex('rgba(255, 0, 255, 0.5)', {print: from[1]})
// Hex
let magentaInRgb = hexToRgb('#FF00Ff', {print: from[2]})
// Hex shorthand
let magentaInRgbFromShorthandHex = hexToRgb('#f0F', {print: from[3]})

//Error examples
let invalidHex = hexToRgb('#FG00FG', {print: from[4]}) // Invalid hex
let invalidRgb = rgbToHex('rgb(255, -1, 255)', {print: from[5]}) // Invalid rgb

// Console logging result codes
console.log(magentaInHex1) // #ff00ff
console.log(magentaInHex2) // #ff00ff
console.log(magentaInRgb) // rgb(255, 0, 255)
console.log(magentaInRgbFromShorthandHex) // rgb(255, 0, 255)
console.log(invalidHex) // Invalid hex
console.log(invalidRgb) // Invalid rgb

// Displaying result codes
to[0].textContent = magentaInHex1
to[1].textContent = magentaInHex2
to[2].textContent = magentaInRgb
to[3].textContent = magentaInRgbFromShorthandHex
to[4].textContent = invalidHex // Invalid hex
to[5].textContent = invalidRgb // Invalid rgb

// Setting background colors
boxes[0].style.backgroundColor = magentaInHex1
boxes[1].style.backgroundColor = magentaInHex2
boxes[2].style.backgroundColor = magentaInRgb
boxes[3].style.backgroundColor = magentaInRgbFromShorthandHex
boxes[4].style.backgroundColor = invalidHex // Invalid hex
boxes[5].style.backgroundColor = invalidRgb // Invalid rgb

console.log('Hex without hashtag', rgbToHex('rgb(255, 255, 255)', {noHashtag: 'y'}))
console.log('Rgb without brackets', hexToRgb('ffffff', {noBrackets: 'y'}))