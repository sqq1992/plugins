/**
 * amdģ�黯
 */
;
(function () {

    //����ģ���������Ϣ
    var moudleCache = {};

    /**
     * ����ڼ���js���ļ�
     * @param arry  ǰ��������js
     * @param callBack  ģ���ִ�к���
     */
    var require = function (arry,callBack) {
        var dependCount = 0,
            allParams = [],        //�������飬�����ĺ�������
            moduleName = document.currentScript && document.currentScript.id || "no name";

        if(arry.length){

            for(var i= 0,j=arry.length;i<j;i++){

                (function (i) {
                    dependCount++;
                    loadModule(arry[i], function (params) { //����ģ��
                        dependCount--;
                        allParams[i] = params;
                        if(dependCount===0){    //��ǰǰ��������jsִ�������ִ���Լ���ģ�麯��
                            saveModule(moduleName, allParams, callBack);
                        }

                    });
                })(i);

            }

        }else{  //û��ǰ��������jsʱ��ֱ��ִ��ģ�����js
            saveModule(moduleName,null, callBack);
        }


    };

    /**
     * ִ��û��������ģ��
     * @param moduleName js��id��
     * @param params    ����Ĳ���
     * @param callBack  ģ����Լ�����Ҫִ�еĻص�����
     */
    var saveModule = function (moduleName,params,callBack) {
        var mod,
            fn;

        if(moudleCache[moduleName]){    //����������������Ż�ִ��������js
            mod = moudleCache[moduleName];
            mod.status = "loaded";
            mod.expert = callBack && callBack.apply(null,params) || null;

            while(fn = mod.onload.shift()){
                fn(mod.expert);
            }
        }else{      //����ֱ��ִ��
            callBack && callBack.apply(null, params);
        }



    };


    /**
     * ����������ģ��
     * @param moduleName    ģ�������id
     * @param callBack      ģ���Ӧ�Ļص�����
     */
    var loadModule = function (moduleName,callBack) {
        var url = _getUrl(moduleName),
            mod;

        if(moudleCache[moduleName]){    //���ģ���Ѿ�����

            mod = moudleCache[moduleName];
            if(mod.status==="loaded"){  //���������js�Ѿ�ִ�У���ֱ�ӵ���
                callBack(mod.expert);
            }else{  //δִ�еĻ���������һ������
                mod.onload.push(callBack);
            }

        }else{  //���ģ�黹δ���صĻ�������л������

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
     * ������Ե�js��url
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