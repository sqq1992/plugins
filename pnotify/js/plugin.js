
;
(function ($) {

    //动画的事件
    function transitionEnd() {
        var el = document.createElement('testTransition')

        //动画过度的回调事件
        var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd otransitionend',
            'transition'       : 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }

        return false
    }

    //定时器
    var Timer = null;

    //模板外壳
    var template = '<section class="pnotify"></section>';

    var Pnotify = function (obj) {
        this.options = $.extend({}, Pnotify.DEFAULTS, obj);
        this.body = $('body');

        this.init();
    };


    Pnotify.prototype = {
        construct:Pnotify,
        init:function(){
            this._initNode();
            this._initEvent();
        },

        /**
         * 初始化节点信息
         * @private
         */
        _initNode:function(){
            var _this = this;
            var options = this.options;
            this.element = this.body.find(">.pnotify");

            if(this.element.length){    //如果模板已经存在
                this._resetElement();
                this.element.show();
            }else{      //模板不存在
                this.element = $(template);
                this.body.append(this.element);
            }

            //插入节点信息
            this.element.html(options.text);

        },

        //初始化事件信息
        _initEvent:function(){
            var _this = this;
            var options = this.options,
                eventName = transitionEnd().end;   //事件名称

            if(Timer){
                clearTimeout(Timer);
            }

            Timer = setTimeout(function () {

                //增加动画隐藏效果
                _this.element.addClass('hidepnotify');

                //增加绑定动画效果隐藏后的事件绑定
                _this.element.off(eventName).on(eventName, function (e) {
                    _this._resetElement();
                });

            }, options.showTime);

        },

        /**
         * 重置显示消息的节点
         * @private
         */
        _resetElement:function(){
            this.element.removeClass('hidepnotify').hide();
        }

    };

    //默认配置参数
    Pnotify.DEFAULTS = {
        showTime:2000,  //存在时间
        animatime:300  //动画时间
    };

    window['Pnotify'] = Pnotify;

})(jQuery);






















