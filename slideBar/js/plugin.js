/**
 * 判断浏览是否支持过度动画
 */
+function ($) {
    'use strict';

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

    /**
     * 触发动画事件,如果某个元素不支持过度动画事件,这个来做为兼容
     * @param duration  传入的延迟时间为毫秒数
     * @returns {jQuery}
     */
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false, $el = this;
        $(this).one($.support.transition.end, function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        //判断此浏览器是否支持动画过度
        $.support.transition = transitionEnd();
    })

}(jQuery);



;(function($){

    /**
     * 侧边栏的显示与隐藏的实列类
     * @param element   显示或隐藏的节点
     * @param options   传入的配置参数
     * @constructor
     */
    var Slider = function (element,options) {
        this.element = element;
        this.options = options;
        this.isShown = false;   //当前是否显示
    };

    //当前侧边栏的显示
    Slider.prototype.show = function () {
        var _this = this;
        //显示前的回调函数
        var e = $.Event("show.slider");
        this.element.trigger(e);

        //如果这个侧边栏已经弹出，则退出，后续代码不做处理
        if(this.isShown) return;
        this.isShown = true;

        //设置侧边栏上的按钮的点击取消弹窗事件
        this.element.on("click.dismiss.slider", '[data-dismiss="slider"]', $.proxy(this.hide, this));

        //插入背景之后的回调函数
        this.backdrop(function () {
            //如果浏览器支持过度动画且这个节点有设置过度动画，则为true
            var isAnimate = $.support.transition && _this.element.hasClass('fade');

            //显示当前节点
            _this.element.show();

            //如果当前支持动画,则进行重排，以便能发生过度动画
            if(isAnimate){
                _this.element[0].offsetWidth;
            }

            //增加过度动画
            _this.element.addClass("in");

            //显示后的回调函数
            var e = $.Event("shown.slider");

            //节点显示完之后的回调函数
            isAnimate?_this.element.one($.support.transition.end,function(){
                //动画完成之后的回调函数
                _this.element.trigger(e);
            }).emulateTransitionEnd(150): _this.element.trigger(e);

        });

    };

    //当前侧边栏的隐藏
    Slider.prototype.hide = function () {

        //隐藏前的回调事件
        var e = $.Event("hide.slider");
        this.element.trigger(e);

        //当前isShown状态为隐藏的话，则直接返回
        if(!this.isShown) return;
        this.isShown = false;

        //当前节点取消激活动画状态，取消click.dismiss.slider事件
        this.element.removeClass("in").off("click.dismiss.slider");

        //是否支持过度动画且是否设置动画类
        var isAnimate = $.support.transition && this.element.hasClass('fade');
        if(isAnimate){  //如果支持过度动画的话，则在过度动画结束之后执行回调
            this.element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(150);
        }else{
            this.hideModal();
        }

    };

    //隐藏节点
    Slider.prototype.hideModal = function () {
        var _this = this;
        this.element.hide();
        //执行取消背景动画的函数，并传入回调函数
        this.backdrop(function () {
            _this.removeBackdrop()
            //隐藏后的回调事件
            var e = $.Event("hidden.slider");
            _this.element.trigger(e);
        })
    };

    /**
     * 移除背景
     */
    Slider.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    //添加则边栏的背景
    Slider.prototype.backdrop = function (callBack) {
        var animate = this.element.hasClass("fade") ? 'fade' : '';    //判断当前侧边栏是动画fade的类

        //当前弹出要为显示
        if(this.isShown && this.options.backdrop){
            var isAnimate = $.support.transition && animate;  //是否有动画的标志

            //在body上定义背景元素div,并附加fade标识来支持动画
            this.$backdrop = $('<div class="backdrop ' + animate + '" />')
                .appendTo(document.body);

            //如果支持过度动画,则让背景元素进行重排,以便能有transition效果
            if(isAnimate) this.$backdrop[0].offsetHeight;

            //背景添加过度动画
            this.$backdrop.addClass("in");

            //如果没有回调，则直接返回
            if(!callBack) return;

            //如果支持动画的话，则为过度动画结束后执行回调，否则直接回调
            isAnimate ? this.$backdrop.one($.support.transition.end, callBack).emulateTransitionEnd(150) : callBack();

        }else if(!this.isShown && this.$backdrop){  //如果为关闭状态，且背景还存在的话，执行函数

            this.$backdrop.removeClass("in");
            var isAnimate = $.support.transition && animate;  //是否有动画的标志
            if(isAnimate){
                this.$backdrop.one($.support.transition.end, callBack).emulateTransitionEnd(150);
            }else{
                callBack();
            }

        }


    };

    //默认配置参数
    Slider.DEFAULTS = {
        name:'xuwei',
        age:26,
        backdrop:true,  //支持动画背景
        show:true   //点击默认是否显示弹窗
    };

    /**
     * 插件实列化的接口
     * @param option    传入的参数
     * @returns {*}     返回当前节点的jq对象
     * @constructor
     */
    $.fn.Slider = function (option) {
        return this.each(function () {
            var $this = $(this);        //当前要显示的侧边栏的jq节点
            var options = $.extend({}, Slider.DEFAULTS, typeof option === "object" && option);  //配置参数

            //插件的实列存放在bs.slider的html标签下
            var data = $this.data('bs.slider');     //存放插件实列
            if(!data) $this.data('bs.slider',data = new Slider($this,options));

            if(typeof option==="string"){   //传入普通字符串对插件进行引用
                data[option]();
            }else if(options.show){         //传入配置参数对插件进行调节
                data.show();
            }

        });
    };


    //通过委托的形式开启插件
    $(document).on("click.bs.slider.data-api", '[data-toggle="slider"]', function (e) {
        var $this = $(this),    //当前点击的节点
            target = $this.attr('data-target'), //当前要显示的侧边栏区域id
            targetNode = $(target),              //当前要显示的jq节点
            option = targetNode.data();         //目标节点的配置参数

        if($this.is('a')) e.preventDefault();   //如果是a连接，则取消默认事件

        //实现插件实列化
        targetNode.Slider(option);

    });

})(jQuery);