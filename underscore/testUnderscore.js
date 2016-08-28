

;
(function () {

    var root = this;

    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;

    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    var
        push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;

    //现代浏览器的api
    var
        nativeIsArray      = Array.isArray,
        nativeKeys         = Object.keys,
        nativeCreate       = Object.create;

    /**
     * 返回一个绑定在指定上下文值得函数
     * @param func  传入的fun
     * @param context   上下文
     * @param argCount
     * @returns {*} 返回函数
     */
    var optimizeCb = function(func, context, argCount) {
        //void 0来兼容低版本ie的underfined被篡改
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    /**
     * 判断对象是否为像数组一样遍历
     * @type {number}
     */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function(collection) {
        var length = collection != null && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };


    /**
     * 创建一个underscore的对象
     * @param obj
     * @returns {_}
     * @private
     */
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    /**
     * 判断function是否为function
     */
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }

    /**
     * 判断underscore用于哪里
     */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    /**
     * 对一个对象进行遍历
     * @param obj   传入的遍历的对象或者数组
     * @param iteratee  传入的回调函数
     * @param context   上下文
     * @returns {*}     返回遍历的对象
     */
    _.each = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };


    /**
     * 判断一个对象是否为数组
     * @type {number}
     */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function(collection) {
        var length = collection != null && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    var cb = function(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };

    /**
     * 返回自己原本的值
     * @param value
     * @returns {*}
     */
    _.identity = function(value) {
        return value;
    };

    /**
     * 判断参数是否是对象
     * @param obj   传入的参数
     */
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    /**
     * 过滤对象的原先连上的属性
     * @param obj   传入的对象
     * @param key   key值
     * @returns {boolean}   返回自身的实列属性
     */
    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    /**
     * 对对象的key值进行遍历，并且将其存入数组，返回新的数组
     * @param obj   需要遍历的对象
     */
    _.keys = function (obj) {
        if(!_.isObject(obj)) return [];
        if(nativeKeys) return nativeKeys(obj);

        //处理不兼容object.keys的浏览器
        var keys = [];
        for(var i in obj) if(_.has(obj,i)) keys.push(i);
        return keys;
    };

    /**
     * 通过转换函数(iteratee迭代器)映射列表中的每个值产生价值的新数组
     * @param obj   传入的数组或者对象
     * @param iteratee  处理数组value值得函数
     * @param context   上下文对象
     * @returns {*} 返回映射之后的数组
     */
    _.map = function (obj,iteratee,context) {
        iteratee = cb(iteratee, context);   //要执行的回调函数

        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for(var index= 0;index<length;index++){
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

}.call(this));