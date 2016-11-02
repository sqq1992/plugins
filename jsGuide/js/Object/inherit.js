/**
 * 继承函数
 * @param obj   传入的对象
 * @returns {*}
 */
function inherit(obj){
    if(obj==null) throw TypeError();
    if(Object.create) return Object.create(obj);

    var type = typeof obj;
    if(type!=='object' && type!=='function') throw TypeError();
    var f = function () {
    };

    f.prototype = obj;
    return new f();
}


////相互引用的对象,会引发内存泄漏，导致删不掉
//var a = {p: {x: 1}};
//var b = a.p;
//delete a.p;

/**
 * 继承函数， o将继承p
 * @param o
 * @param p
 */
function extend(o,p){
    for(var prop in p){
        o[prop] = p[prop];
    }
    return o;
}

var o = {};
var p = {x: 1, y: 2, z: 3};
//console.log(extend(o, p));


var AA = {x: 1};
var aa = Object.create(AA);
var test = AA.isPrototypeOf(aa);

/**
 * 判断这个值的类型
 * @param obj
 */
function classOf(obj){

    return Object.prototype.toString.call(obj).slice(8, -1);

}
var t1 = classOf('111');







