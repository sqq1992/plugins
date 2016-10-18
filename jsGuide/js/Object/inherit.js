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


//相互引用的对象,会引发内存泄漏，导致删不掉
var a = {p: {x: 1}};
var b = a.p;
delete a.p;
