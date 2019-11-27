/**
 * �̳к���
 * @param obj   ����Ķ���
 * @returns {*}
 */
function inherit(obj){
    if(obj==null) throw TypeError();
    if(Object.create) return Object.create(obj);

    var type = typeof obj;
    if(type!=='object' && type!=='function') throw TypeError();
    var f = function () {};

    f.prototype = obj;
    return new f();
}




/**
 * �̳к����� o���̳�p
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
 * �ж����ֵ������
 * @param obj
 */
function classOf(obj){

    return Object.prototype.toString.call(obj).slice(8, -1);

}
var t1 = classOf('111');







