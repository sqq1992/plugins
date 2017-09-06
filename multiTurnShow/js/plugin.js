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
    var TurnShow = function (element,options) {
        this.element = element;
        this.options = options;

        this.init();
    };


    TurnShow.prototype._config = function () {
        this.viewList = this.element.find(".view-list");
        this.lists = this.viewList.find("li");
        this.ownedLen = this.lists.length;

        //配置页面宽度和单个移动宽度
        var allWidth = this.viewList.width();
        this.showLength = this.options.showLength;
        this.oneWidth = allWidth / this.showLength;

        //当前的索引
        this.index = 0;
        this.flag = true;
    };

    TurnShow.prototype.setStructure = function () {
        var showLength = this.showLength,
            copyLen = showLength - 1,
            oneWidth = this.oneWidth,
            prevNodes = this.lists.slice(showLength - copyLen-1, showLength).clone(true),
            nextNodes = this.lists.slice(0, copyLen).clone(true),
            addLen = prevNodes.size();


        this.viewList.prepend(prevNodes);
        this.viewList.append(nextNodes);

        //配置新的页面宽度和结构
        var newList = this.viewList.find("li");
        newList.width(this.oneWidth);
        var newListLen = newList.size();
        this.viewList.width(oneWidth * newListLen);

        //配置初始位置
        var copyLen = prevNodes.size();
        this.initPosition = -copyLen * oneWidth;
        this.viewList.css("margin-left",+ this.initPosition + "px");

        //配置索引
        this.firstIndex = -addLen;
        this.lastIndex = this.showLength + addLen - 2;

    };


    TurnShow.prototype.init = function () {

        this._config();
        if(this.ownedLen<=this.showLength) return false;
        this.setStructure();
        this.initEvent();

    };

    TurnShow.prototype._run = function (direction) {
        var _this = this;
        var index = this.index,
            oneWidth = this.oneWidth,
            position = this.initPosition - oneWidth * index;

        this.viewList.animate({
            "margin-left":position+"px"
        },200,function () {
            _this.flag = true;

            var newPoisition;
            if(direction=="right"){

                if(index<=_this.firstIndex){
                    _this.index += _this.showLength-1;
                    newPoisition = _this.initPosition - oneWidth * _this.index;

                    _this.viewList.css("margin-left", newPoisition + "px");

                }

            }else if(direction=="left"){

                if(index>=_this.lastIndex){
                    _this.index -= _this.showLength;
                    newPoisition = _this.initPosition - oneWidth * _this.index;

                    _this.viewList.css("margin-left", newPoisition + "px");
                }

            }



        })



    };

    //当前侧边栏的显示
    TurnShow.prototype.initEvent = function () {
        var _this = this;
        this.element
            .on("click", '.prev-btn', function () {

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index--;
                _this._run('right');

            })
            .on("click", '.next-btn', function () {

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index++;
                _this._run('left')

            })

    };



    //默认配置参数
    TurnShow.DEFAULTS = {
        showLength:3
    };

    /**
     * 插件实列化的接口
     * @param option    传入的参数
     * @returns {*}     返回当前节点的jq对象
     * @constructor
     */
    $.fn.TurnShow = function (option) {
        return this.each(function () {
            var $this = $(this);        //当前要显示的侧边栏的jq节点
            var options = $.extend({}, TurnShow.DEFAULTS, typeof option === "object" && option);  //配置参数

            //插件的实列存放在bs.slider的html标签下
            var data = $this.data('bs.turnShow');     //存放插件实列
            if(!data) $this.data('bs.turnShow',data = new TurnShow($this,options));

        });
    };


})(jQuery);