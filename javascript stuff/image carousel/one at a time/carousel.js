//One image at a time carousel
// <img> elements must be all pasted into html

const images = document.querySelectorAll('img')
images.forEach(function(img, index){
    img.style.display = 'none'

    if(index===0){
        img.style.display = 'block'
    }
})

//Index tracking
let i = 0;

//Buttons in html
const previous = document.getElementById('previous')
const next = document.getElementById('next')
const start = document.getElementById('start')
const end = document.getElementById('end')

next.addEventListener('click', function(){
    i+=1
    if(i===images.length){
        i = 0
    }

    images.forEach(function(img, index){
        if(index==i){
            img.style.display = 'block'
        }else{
            img.style.display = 'none'
        }
    })
})

previous.addEventListener('click', function(){
    i-=1
    if(i===-1){
        i = images.length-1
    }

    images.forEach(function(img, index){
        if(index==i){
            img.style.display = 'block'
        }else{
            img.style.display = 'none'
        }
    })
})

start.addEventListener('click',function(){
    i = 0
    images.forEach(function(img){
        img.style.display = 'none'
    })

    images[0].style.display = 'block'

})

end.addEventListener('click',function(){
    i = images.length-1
    images.forEach(function(img){
        img.style.display = 'none'
    })

    images[images.length-1].style.display = 'block'

})