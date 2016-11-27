/**
 * amd模块化
 */
;
(function () {

    //缓存模块的数据信息
    var moudleCache = {};

    /**
     * 主入口加载js的文件
     * @param arry  前置依赖的js
     * @param callBack  模块的执行函数
     */
    var require = function (arry,callBack) {
        var dependCount = 0,
            allParams = [],        //参数数组，给最后的函数调用
            moduleName = document.currentScript && document.currentScript.id || "no name";

        if(arry.length){

            for(var i= 0,j=arry.length;i<j;i++){

                (function (i) {
                    dependCount++;
                    loadModule(arry[i], function (params) { //加载模块
                        dependCount--;
                        allParams[i] = params;
                        if(dependCount===0){    //当前前置依赖的js执行完后，在执行自己的模块函数
                            saveModule(moduleName, allParams, callBack);
                        }

                    });
                })(i);

            }

        }else{  //没有前置依赖的js时，直接执行模块里的js
            saveModule(moduleName,null, callBack);
        }


    };

    /**
     * 执行没有依赖的模块
     * @param moduleName js的id名
     * @param params    传入的参数
     * @param callBack  模块的自己本身要执行的回调函数
     */
    var saveModule = function (moduleName,params,callBack) {
        var mod,
            fn;

        if(moudleCache[moduleName]){    //如果存在依赖，则优化执行依赖的js
            mod = moudleCache[moduleName];
            mod.status = "loaded";
            mod.expert = callBack && callBack.apply(null,params) || null;

            while(fn = mod.onload.shift()){
                fn(mod.expert);
            }
        }else{      //否则直接执行
            callBack && callBack.apply(null, params);
        }



    };


    /**
     * 加载依赖的模块
     * @param moduleName    模块的名字id
     * @param callBack      模块对应的回调函数
     */
    var loadModule = function (moduleName,callBack) {
        var url = _getUrl(moduleName),
            mod;

        if(moudleCache[moduleName]){    //如果模块已经存在

            mod = moudleCache[moduleName];
            if(mod.status==="loaded"){  //如果依赖的js已经执行，则直接调用
                callBack(mod.expert);
            }else{  //未执行的话，则增加一次依赖
                mod.onload.push(callBack);
            }

        }else{  //如果模块还未加载的话，则进行缓存加载

            moudleCache[moduleName] = {
                status:'loading',
                expert:null,
                onload:[callBack]
            };

            var script = document.createElement('script');
            script.id = moduleName;
            script.src = url;
            script.type = "text/javascript";
            script.async = true;

            var _script = document.getElementsByTagName('script')[0];
            _script.parentNode.insertBefore(script, _script);
        }

    };

    /**
     * 生成相对的js的url
     * @param name
     * @private
     */
    var _getUrl = function (name) {
        var url;
        url = name.indexOf(".js") === -1 ? name += ".js" : name;
        return url;
    };

    window.require = require;
    window.define = require;

})();