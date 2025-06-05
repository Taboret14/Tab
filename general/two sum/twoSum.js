let array = [1, 9, 7, 5, 3]
let target = 12

for(a=0; a<array.length; a++){
    for(b=a+1; b<array.length; b++){
        if(array[a] + array[b]===target){
            console.log([a,b])
        }
    }
}