//Trivial stuff

const rSlider = document.getElementById('rSlider')
const gSlider = document.getElementById('gSlider')
const bSlider = document.getElementById('bSlider')

color = document.getElementById('color')

window.addEventListener("load",function(){
    color.style.backgroundColor = `rgb(${rSlider.value}, ${gSlider.value}, ${bSlider.value})`
    color.textContent = color.style.backgroundColor
})

arr = [rSlider, gSlider, bSlider]

arr.forEach(function(e){
    e.addEventListener("input",function(){
        color.style.backgroundColor = `rgb(${rSlider.value}, ${gSlider.value}, ${bSlider.value})`
        color.textContent = color.style.backgroundColor

        array = [rSlider.value, gSlider.value, bSlider.value]
        array.every(function(e){
            if(e <= 100){
                color.style.color = "white"
            }else{
                color.style.color = "black"
            }
        })
    })
})