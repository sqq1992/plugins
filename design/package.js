
//封装


var myObject = (function () {
    var name = "sun1992";
    return {
        getName: function () {
            return name;
        },
        setName:function(name){
            name = name;
        }
    };
})();

console.log(myObject.getName());
console.log(myObject.name);

myObject.setName("sun1993");
console.log(myObject.getName());
