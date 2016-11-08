var a = ['a', , 'b', undefined, 'c'];

//for(var i= 0,j= a.length;i<j;i++){
//    //if(a[i]===undefined) continue;
//    if(!(i in a)) continue;
//    console.log(a[i]);
//}

//for(var i in a){
//    console.log(i);
//}



/**
 * 从数组的位置搜索val值得指定位置，生成一个数组后返回
 * @param arry
 * @param val
 */
function findall(arry,val){
    var newArry = [],
        len = arry.length,
        index = 0;

    while(index<len){
        index = arry.indexOf(val, index);
        if(index===-1) break;
        newArry.push(index);
        index = index + 1;
    }

    return newArry;

}

var ar = findall([2, 3, 4, 5, 28, 2, 2], 2);
console.log(ar);