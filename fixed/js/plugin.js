

;(function($){

    var Fixed = function (element, options) {
        this.parent = element;
        this.options = options;

        //初始化
        this.init();
    };

    Fixed.prototype = {
        constructor:Fixed,

        //初始化节点和函数
        init:function(){

            this._initNode();
            this._initEvent();
        },

        //初始化节点信息
        _initNode:function(){
            this.window = $(window);
            this.offsetTop = this.parent.offset().top;
            console.log(this.parent.offset().top);

        },

        //初始化函数信息
        _initEvent:function(){
            var _this = this,
                options = this.options;

            var timer = null;


            /**
             * 执行导航栏的滑动事件
             */
            this.window.off("scroll.Fixed").on("scroll.Fixed", function () {

                //clearTimeout(timer);

                //timer = setTimeout(function () {
                    var scrollTop = $(this).scrollTop();
                    if(scrollTop>=_this.offsetTop){
                        _this.parent.css({
                            position:'fixed',
                            top:0
                        });
                    }else{
                        _this.parent.css({
                            position:'absolute',
                            top:_this.offsetTop
                        });
                    }
                //},10);

            });

            //默认执行一次滑动事件
            this.window.trigger('scroll.Fixed');

        }

    };

    //默认配置参数
    Fixed.DEFAULTS = {
        animateTime:200 //动画运动时间
    };


    /**
     * 插件的启动入口
     * @param option
     * @returns {*}
     */
    $.fn.Fixed = function (option) {

        return this.each(function () {
            var $this = $(this),
                options = $.extend({},Fixed.DEFAULTS,typeof option==='object' && option);

            var data = $this.data("bs.fixed");
            if(!data) $this.data('bs.fixed', data = new Fixed($this, options));

        });

    };

})(jQuery)