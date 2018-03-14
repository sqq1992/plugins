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
 * �������λ������valֵ��ָ��λ�ã�����һ������󷵻�
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

//2 reduce
var numbers = [1, 1, 1, 1];

function getSum(total, num) {
    return total + num;
}
var newNumbers = numbers.reduce(getSum,2);
console.log(newNumbers);

//3
var sum = function (x, y) {
    return x + y;
};
var square = function (x) {
    return x * x;
}
var data2 = [2, 3, 4, 5];

var mapData2 = data2.map(function (x) {
    return x - 2;
});
console.log(mapData2);

//4
var map = function (arry, fun) {
    var results = [];

    for(var i=0,j=arry.length;i<j;i++){
        results[i] = fun.call(null, arry[i]);
    }
    return results;
};

var testMap = map([1,2,3,4],function (x) {
    return x + 1;
})
console.log(testMap);

//5
var reduce = function (arry,fun,initVal) {
    var i=0,len = arry.length,accumlators;

    if(arguments.length>2){
        accumlators = initVal;
    }else {
        if(len==0) throw TypeError();

        while (i<len){
            if(i in arry){
                accumlators = arry[i++];
                break;
            }else {
                i++;
            }

        }

        if(i==len) throw TypeError();
    }

    while (i<len){
        if(i in arry){
            accumlators = fun.call(undefined, accumlators, arry[i], i, arry);
        }
        i++;
    }

    return accumlators;

}

//6
var reduceData = [1, 2, 3, 4, 5];
var sum = function (x,y) {
    return x + y;
}
var newReuceData = reduce(reduceData, sum);
console.log(newReuceData);

//7
var reducedata2 = { a: { b: { c: 'ScriptOJ' } } }
const safeGet = (o, path) => {
    try {
        return path.split('.').reduce(
            (o, k) =>
                o[k], o
        )
    } catch (e) {
        return void 666
    }
}

console.log(safeGet(reducedata2, 'a.b.c'));