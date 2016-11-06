

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
     * 返回一个对象的key值的value值，不存在则返回undefined
     * @param key   传入的key值
     * @returns {Function}  返回这个函数
     */
    _.property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    /**
     * 判断对象是否为函数的参数
     */
    _.isArguments = function(obj) {
        return _.has(obj, 'callee');
    };

    /**
     * 返回数组的中对象的key值的的集合数组
     * @param obj   传入的对象
     * @param key   key值
     * @returns {*|Array}   返回数组
     */
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };

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

    /**
     * 对数组里的值进行从小到大的排序
     * @param obj   传入的对象
     * @param iteratee  处理这个数组或者对象的函数
     * @param context   上下文
     * @private
     */
    _.sortBy = function (obj,iteratee,context) {
        iteratee = cb(iteratee, context);
        //根据value值筛选特定值组成数组
        return _.pluck(_.map(obj, function (value, index, list) {   //将这个对象先衍射为数组中的普通对象
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            }
        }).sort(function (left, right) {        //对这个数组中的普通对象进行排序
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');

    };


    /**
     * 比较两个深度对象的值是否相同
     * @param a     第一个比较参数
     * @param b     第二个比较参数
     * @param aStack
     * @param bStack
     */
    var eq = function (a, b, aStack, bStack) {

        //0和-0在_.isEqual中是不相等的，可能-0没有意义
        if(a===b){
            return a !== 0 || 1 / a === 1 / b;
        }

        //筛选掉null或者undefined
        if(a==null || b ==null) return a === b;

        //如果a和b是underscore的oop对象
        //那么比较_wrapped属性
        if(a instanceof _) a = a._wrapped;
        if(b instanceof _) b = b._wrapped;

        //数据类型
        var className = toString.call(a);

        //判断a和b的数据类型是否相等
        if(className !== toString.call(b)) return false;

        //判断a和b的基础类型值是否相同
        switch (className){
            case '[object RegExp]':     //对正则和字符串转换为字符串进行比较
            case '[object String]':
                // 转为 String 类型进行比较
                return '' + a === '' + b;

            case '[object Number]':

                //如果两个参数是NaN，则也认为是相等
                if (+a !== +a) return +b !== +b;

                //对0和-0做特殊处理，0和-0js里相等，但实际是不相等的
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;

            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }

        // 判断 a 是否是数组
        var areArrays = className === '[object Array]';
        //如果a参数不是数组的话
        if(!areArrays){
            //如果不是对象，返回false
            if(typeof a!='object' || typeof b!='object') return false;

            // 通过构造函数来判断 a 和 b 是否相同
            // 但是，如果 a 和 b 的构造函数不同
            // 也并不一定 a 和 b 就是 unequal
            // 比如 a 和 b 在不同的 iframes 中！
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                _.isFunction(bCtor) && bCtor instanceof bCtor)
                && ('constructor' in a && 'constructor' in b)) {
                return false;
            }

        }

        //堆栈
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {      //堆栈里的参数是否相同
            if (aStack[length] === a) return bStack[length] === b;
        }

        //增加堆栈的数据
        aStack.push(a);
        bStack.push(b);

        if(areArrays){  //如果是数组的话
            length = a.length;
            if(length !== b.length) return false;
            while(length--){    //进行深度嵌套对比里面的数据是否相等
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        }else{      //如果不是数组对象
            var keys = _.keys(a), key;
            length = keys.length;

            // a 和 b 对象的键数量不同
            if (_.keys(b).length !== length) return false;

            while (length--) {
                // 递归比较
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }

        //将堆栈弹出
        aStack.pop();
        bStack.pop();
        return true;

    };

    /**
     * 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。
     * @param a 参数1
     * @param b 参数2
     */
    _.isEqual = function (a,b) {
        return eq(a, b);
    };

    /**
     * 判断一个对象是否为数组
     * @type {*|Function}
     */
    _.isArray = nativeIsArray || function(obj) {
            return toString.call(obj) === '[object Array]';
    };

    /**
     * 判断一个对象是否有key值
     * @param obj
     * @returns {boolean}
     */
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };

    //_.isFunction 在 old v8, IE 11 和 Safari 8 下的兼容
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }

}.call(this));