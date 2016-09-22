/**
 * 旋转木马的插件
 */
;
(function ($) {

    var Carousel = function (element,option) {
        this.element = element;     //当前节点
        this.options = option;      //当前配置参数

        this.pic = this.element.find(".pic-box li");    //图片列表
        this.picBox = this.element.find(".pic-box");    //图片区域
        this.preBtn = this.element.find(".pre-btn");    //向左按钮
        this.nextBtn = this.element.find(".next-btn");  //向右按钮

        //初始化
        this.init();
    };

    Carousel.prototype = {
        constructor:Carousel,

        //初始化
        init:function(){

            //配置节点信息
            this._configDom();

            //配置位置信息
            this._setPos();

        },

        //配置节点信息
        _configDom:function(){
            this.picLength = this.pic.size();
            if(this.picLength%2===0){
                this.picBox.append(this.pic.first().clone());
                this.pic = this.element.find(".pic-box li");    //图片列表
            }
            this.firstPic = this.pic.first();
            this.lastPic = this.pic.last();

            console.log()
        },

        //配置位置信息
        _setPos:function(){
            var options = this.options;
            var SlicePic = this.pic.slice(1),
                sliceSize = SlicePic.size() / 2,
                level = Math.floor(this.pic.size()/2),  //
                rightPic = SlicePic.slice(0, sliceSize), //右边的图片
                leftPic = SlicePic.slice(sliceSize);    //左边的图片

            //配置总区域的宽高
            this.element.css({
                width:options.width,
                height:options.height
            });

            //配置右边节点的宽高
            var rw = options.showWidth,
                rh = options.showHeight,
                gap = ((options.width-options.showWidth)/2)/level;

            var fistLeft = (options.width - options.showWidth) / 2;
            var fixOffsetLeft = fistLeft+rw;
            rightPic.each(function () {

            });


        }


    };

    //默认配置参数
    Carousel.DEFAULTS = {
        isAutoPlay:false,   //是否轮播
        width:1000,         //总区域宽度
        height:270,         //总区域的高度
        showWidth:640,      //显示单个图片的宽度
        showHeight:270      //显示单个图片的高度
    };

    $.fn.carousel = function (option) {

        return this.each(function () {
            var $this = $(this);        //当前要显示的侧边栏的jq节点
            var options = $.extend({}, Carousel.DEFAULTS, typeof option === "object" && option);  //配置参数

            var data = $this.data('carousel');     //存放插件实列
            if(!data) $this.data('carousel',data = new Carousel($this,options));

        });

    };

})(jQuery);