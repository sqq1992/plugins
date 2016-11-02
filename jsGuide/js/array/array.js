var a = ['a', , 'b', undefined, 'c'];

//for(var i= 0,j= a.length;i<j;i++){
//    //if(a[i]===undefined) continue;
//    if(!(i in a)) continue;
//    console.log(a[i]);
//}

for(var i in a){
    console.log(i);
}