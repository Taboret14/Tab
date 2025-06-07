// 3 images carousel
// <img> elements must be all pasted into html

// Container with all <img> elements
const imagesContainer = document.querySelector('.images')

// An array with all images in the container
let images = imagesContainer.querySelectorAll('img')

// Hides all images
images.forEach(function(img, index){
    img.style.display = 'none'
})

//Initializes the 3 default images (the rest is hidden)
images[0].style.display = 'block'
images[1].style.display = 'block'
images[2].style.display = 'block'

images[0].classList.add('left')
images[1].classList.add('mid')
images[2].classList.add('right')

// Update
function update(direction){

    let lastImage = images[images.length - 1]
    let firstImage = images[0]

    /*
    Direction :
        if next is clicked -> moves the first image to the last index
        if previous is clicked -> moves the last image to the first index
        creates the cycle effect
    */

    if(direction==="next"){
        imagesContainer.appendChild(firstImage) //moves to end
    }else if(direction==="prev"){
        imagesContainer.insertBefore(lastImage, firstImage) // move last to start (before first image)
    }

    images = imagesContainer.querySelectorAll('img')
    
    //Reset all styles
    images.forEach(function(img){
        img.style.display = 'none'
        img.classList.remove('left', 'mid', 'right')
    })

    //Add styles to the correct 3 images:

    //Left
    images[0].style.display = 'block'
    images[0].classList.add('left')

    //Middle
    images[1].style.display = 'block'
    images[1].classList.add('mid')

    //Right
    images[2].style.display = 'block'
    images[2].classList.add('right')
}

//Event listeners
next.addEventListener("click",function(){
    update("next")
})

previous.addEventListener("click",function(){
    update("prev")
})

