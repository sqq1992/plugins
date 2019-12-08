(function () {

    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global);

    //basic config
    var ArrayProto = Array.prototype;
    var push = ArrayProto.push;
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

   var chainResult = function (instance, obj) {
        return instance._chain ? _.chain(obj) : obj;
    };

    var flatten = function (input, shallow, strict, output) {

        output = output || [];
        var idx = output.length;

        for(var i=0,j=input.length;i<j;i++) {

            var value = input[i];

            if(isArrayLike(value)){

                if(shallow){
                    var min = 0;
                    var len = value.length;
                    while (min<len){
                        output[idx++] = value[min++];
                    }
                }else {
                    flatten(value, shallow, strict, output);
                    idx = output.length;
                }


            }else if(!strict){
                output[idx++] = value;
            }

        }

        return output;
    };

    var unique = function (array) {
        return Array.from(new Set(array));
    };

    //main func
    var _ = function (obj) {

        if(!(this instanceof _)){
            return new _(obj);
        }
        this._wrapped = obj;
    };
    root._ = _;


    //functions list
    _.flatten = function (array,shallow) {
        return flatten(array, shallow, false);
    };

    _.union = function () {
        return unique(flatten(arguments, true, true));
    };

    _.difference = function (array,...rest) {

        rest = flatten(rest, true, true);

        return array.filter((elem)=>{
            return rest.indexOf(elem) === -1;
        })

    };

    _.each = function (obj,callBack) {

        if(isArrayLike(obj)){
            for(var i=0,j=obj.length;i<j;i++) {
                if(callBack.call(obj[i],obj[i],i)===false){
                    break;
                }
            }
        }else {
            for(var j in obj){
                if(callBack.call(obj[j],obj[j],j)===false){
                    break;
                }
            }
        }

        return obj;
    };

    _.reverse = function (str) {
        return str.split('').reverse().join('');
    };

    _.isFunction = function (obj) {
        return typeof obj == "function" || false;
    };

    _.functions = function (obj) {
        var names = [];

        for(var i in obj) {
            if(_.isFunction(obj[i])){
                names.push(i);
            }
        }
        return names.sort();
    };

    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };



    _.mixin = function (obj) {
        var functionNames = _.functions(obj);

        _.each(functionNames, function (elem) {
            var func = obj[elem];
            _.prototype[elem] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);

                return chainResult(this, func.apply(_, args));
            };
        });
    };


    _.mixin(_);
})();
