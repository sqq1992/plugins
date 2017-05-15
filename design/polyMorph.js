
//多态

var sound = function (animal) {

    if(animal instanceof Duck){
        console.log("鸭子叫");
    }else if(animal instanceof Dog){
        console.log("狗叫声");
    }

};

var Duck = function () {
};
var Dog = function () {
};

sound(new Duck());
sound(new Dog());


