
//1
function t1(a){

    try{
        a.push('a');
    }catch(e){
        console.log(e);
    }

    console.log("我是天才");

}

t1(20);

//2
function array(a,n) {
    return Array.prototype.slice.call(a, n || 0);
}

function partialLeft(f) {
    var args = arguments;

    return function () {
        var a = array(args,1);
        a = a.concat(array(arguments));
        return f.apply(this, a);
    };
}

function partialRight(f) {
    var args = arguments;
    return function () {
        var a = array(arguments);
        a = a.concat(array(args, 1));
        return f.apply(this, a);
    };
}

var f = function (x,y,z) {
    return x * (y - z);
}

var sum = function (x, y) {
    return x + y;
};

var product = function (x,y) {
    return x * y;
}

//1
console.log(partialLeft(f, 2)(3, 4));
console.log(partialRight(f, 2)(3, 4));

//2
var increment = partialLeft(sum, 1);
console.log(increment(3));

//3
var testStr = "abcd";
String.prototype.first = partialLeft(String.prototype.charAt, 0);
String.prototype.last = partialLeft(String.prototype.substr, -1,1);
console.log(testStr.first());
console.log(testStr.last());

//4
var F = function () {

};
var p = F.prototype;
var c = p.constructor;
console.log('4', c === F);

//5
function extend(previousObj,latestObj) {

    for(var i in latestObj){
        previousObj[i] = latestObj[i];
    }

    return previousObj;
}

function defineClass(constructor,methods,statics) {

    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, methods);

    return constructor;
}

//6
function Complex(real,imaginary) {
    if(isNaN(real) || isNaN(imaginary)){
        throw new TypeError();
    }
    this.r = real;
    this.i = imaginary;
}
Complex.prototype.add = function (that) {
    return new Complex(this.r + that.r, this.i + that.i);
};
Complex.prototype.toString = function () {
    console.log(this.r, this.i);
    return "{" + this.r + "," + this.i + "}";
};

var c = new Complex(2, 3);
var d = new Complex(c.r, c.i);
c.add(d).toString();

//7
Function.prototype.getName = function () {
    return this.name;
};
var testname = function () {

}
console.log(testname.getName());
