

;(function($){

    var ScrollNav = function (element, options) {
        this.parent = element;
        this.options = options;

        //初始化
        this.init();
    };

    ScrollNav.prototype = {
        constructor:ScrollNav,

        //初始化节点和函数
        init:function(){

            this._initNode();
            this._initEvent();
        },

        //初始化节点信息
        _initNode:function(){
            this.navNodes = this.parent.find("[data-scroll-nav]");  //当前的导航点们
            this.window = $(window);
            this.htmlBody = $('html,body');

        },

        //初始化函数信息
        _initEvent:function(){
            var _this = this,
                options = this.options;

            /**
             * 点击导航条到指定的位置去
             */
            this.parent.off("click.ScrollNav").on("click.ScrollNav", "[data-scroll-nav]", function () {
                var $this = $(this);

                $this.addClass('active').siblings().removeClass('active');
                var target = $('[data-scroll-target="'+$this.attr('data-scroll-nav')+'"]');



                _this.htmlBody.animate({
                    scrollTop: target.offset().top
                }, options.animateTime);

            });


            /**
             * 执行导航栏的滑动事件
             */
            this.window.off("scroll.ScrollNav").on("scroll.ScrollNav", function () {

                var scrollTop = $(this).scrollTop(),
                    shows = $("[data-scroll-target]");

                var show,
                    target;
                shows.each(function () {
                    var $this = $(this),
                        top = $this.offset().top;
                    if(scrollTop>=top){
                        show = $this;
                    }else{
                        return false;
                    }
                });
                if(show){
                    target = $('[data-scroll-nav="' + show.attr('data-scroll-target'));
                    target.addClass('active').siblings().removeClass('active');
                }

            });

            //默认执行一次滑动事件
            this.window.trigger('scroll.ScrollNav');

        }

    };

    //默认配置参数
    ScrollNav.DEFAULTS = {
        animateTime:200 //动画运动时间
    };


    /**
     * 插件的启动入口
     * @param option
     * @returns {*}
     */
    $.fn.scrollNav = function (option) {

        return this.each(function () {
            var $this = $(this),
                options = $.extend({},ScrollNav.DEFAULTS,typeof option==='object' && option);

            var data = $this.data("bs.scrollNav");
            if(!data) $this.data('bs.scrollNav', data = new ScrollNav($this, options));

        });

    };

})(jQuery)