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
    var f = function () {
    };

    f.prototype = obj;
    return new f();
}


//�໥���õĶ���,�������ڴ�й©������ɾ����
var a = {p: {x: 1}};
var b = a.p;
delete a.p;
