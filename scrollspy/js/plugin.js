

;(function($){

    var ScrollNav = function (element, options) {
        this.parent = element;
        this.options = options;

        //��ʼ��
        this.init();
    };

    ScrollNav.prototype = {
        constructor:ScrollNav,

        //��ʼ���ڵ�ͺ���
        init:function(){

            this._initNode();
            this._initEvent();
        },

        //��ʼ���ڵ���Ϣ
        _initNode:function(){
            this.navNodes = this.parent.find("[data-scroll-nav]");  //��ǰ�ĵ�������
            this.window = $(window);
            this.htmlBody = $('html,body');
            this.detailArry = [];

        },

        //��ʼ��������Ϣ
        _initEvent:function(){
            var _this = this,
                options = this.options;

            var scrollFlag = true;
            /**
             * �����������ָ����λ��ȥ
             */
            this.parent.off("click.ScrollNav").on("click.ScrollNav", "[data-scroll-nav]", function () {
                var $this = $(this);

                $this.addClass('active').siblings().removeClass('active');
                var target = $('[data-scroll-target="'+$this.attr('data-scroll-nav')+'"]');


                scrollFlag = false;

                _this.htmlBody.animate({
                    scrollTop: target.offset().top
                }, options.animateTime,function(){
                    scrollFlag = true;
                });

            });


            /**
             * ִ�е������Ļ����¼�
             */
            this.window.off("scroll.ScrollNav").on("scroll.ScrollNav", function () {

                //����������������ִ������ĺ���
                if(!scrollFlag){
                    return false;
                }

                var scrollTop = $(this).scrollTop(),
                    shows = $("[data-scroll-target]");

                shows.each(function () {
                    var $this = $(this),
                        height = $this.height(),
                        top = $this.offset().top;

                    var target;
                    if((scrollTop-height)<=top && top<=scrollTop){
                        target = $('[data-scroll-nav="' + $this.attr('data-scroll-target') + '"]');
                        target.addClass('active').siblings().removeClass('active');
                        return false;
                    }

                });

            });

            //Ĭ��ִ��һ�λ����¼�
            this.window.trigger('scroll.ScrollNav');

        }

    };

    //Ĭ�����ò���
    ScrollNav.DEFAULTS = {
        animateTime:200 //�����˶�ʱ��
    };


    /**
     * ������������
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