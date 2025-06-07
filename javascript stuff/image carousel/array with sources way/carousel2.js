// 3 images carousel
// 3 empty <img> elements in html + an array with all image adresses

let sourcesArray = [
    'https://upload.wikimedia.org/wikipedia/en/0/0f/Radiohead.pablohoney.albumart.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png',
    'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png',
    'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png',
    'https://upload.wikimedia.org/wikipedia/en/8/8c/Radiohead_-_Amnesiac_cover.png',
    'https://upload.wikimedia.org/wikipedia/en/6/61/Radioheadhailtothethief.png',
    'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png',
    'https://upload.wikimedia.org/wikipedia/en/a/a2/Radioheadthekingoflimbs.png',
    'https://upload.wikimedia.org/wikipedia/en/6/6a/Amoonshapedpool.png'
]

const imagesContainer = document.querySelector('.images')
let images = imagesContainer.querySelectorAll('img')

//Index tracking
let i = 1;

let leftI = i - 1
let midI = i
let rightI = i + 1

//Buttons in html
const previous = document.getElementById('previous')
const next = document.getElementById('next')

function update(direction){

    if(direction==="next"){
        i++
        leftI++
        rightI++
    }else if(direction==="prev"){
        i--
        leftI--
        rightI--
    }

    if(i<0){
       i = sourcesArray.length-1
    }
    if(i===sourcesArray.length){
        i = 0
    }

    if(leftI<0){
       leftI = sourcesArray.length-1
    }
    if(leftI===sourcesArray.length){
        leftI = 0
    }

    midI = i

    if(rightI<0){
       rightI = sourcesArray.length-1
    }
    if(rightI===sourcesArray.length){
        rightI = 0
    }

    images[0].classList.add('left')
    images[1].classList.add('mid')
    images[2].classList.add('right')

    images[0].src = sourcesArray[leftI]
    images[1].src = sourcesArray[midI]
    images[2].src = sourcesArray[rightI]

    console.log(leftI,midI,rightI)

    images = imagesContainer.querySelectorAll('img')

}

//Initialize
update()

next.addEventListener("click",function(){
    update("next")
})

previous.addEventListener("click",function(){
    update("prev")
})