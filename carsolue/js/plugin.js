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

            //配置事件信息
            if(this.picLength===1){

            }else{
                this._initEvent();
            }
        },

        //配置节点信息
        _configDom:function(){
            this.picLength = this.pic.size();

            if(this.picLength===1){

            }else if(this.picLength===2){

            }else if(this.picLength>2){
                if(this.picLength%2===0){
                    this.isOdd = false;
                    //this.picBox.append(this.pic.first().clone());
                    //this.pic = this.element.find(".pic-box li");    //图片列表
                }else{
                    this.isOdd = true;
                }
            }
            this.firstPic = this.pic.first();
            this.lastPic = this.pic.last();

        },

        //配置位置信息
        _setPos:function(){
            var _this = this;
            var options = this.options;
            var SlicePic = this.pic.slice(1),
                sliceSize = Math.ceil(SlicePic.size() / 2),
                level = Math.ceil(SlicePic.size() / 2),  //
                rightPic = SlicePic.slice(0, sliceSize), //右边的图片
                leftPic = SlicePic.slice(sliceSize),    //左边的图片
                scale = options.scale,                  //缩放比例
                width = options.width,                  //画面的宽度
                height = options.height;                //画面的高度

            //配置总区域的宽高
            this.element.css({
                width:width,
                height:height
            });

            //一些公共的属性值
            var rw = options.showWidth,
                rh = options.showHeight,
                gap = ((options.width-options.showWidth)/2)/level;  //层级宽度

            var fistLeft = (options.width - options.showWidth) / 2;
            var fixOffsetLeft = fistLeft+rw;

            //配置第一个节点
            this.firstPic.css({
                width: rw,
                height: rh,
                opacity: 1,
                left: fistLeft,
                top: (height - rh) / 2,
                zIndex: level + 1
            }).addClass('active');

            //配置左右的按钮属性
            this.preBtn.css({
               width:fistLeft,
               zIndex:level+1
            });

            this.nextBtn.css({
                width:fistLeft,
                zIndex:level+1
            });

            //配置右边节点的宽高等属性
            rightPic.each(function (i) {

                rw = rw * scale;
                rh = rh * scale;

                var j = i;  //暂时性判断列表的索引
                var tempZindex = level - 1 - i;

                $(this).css({
                    width:rw,
                    height:rh,
                    opacity:1/(_this.picLength!==2?(++j):((++j)+1)),
                    left:fixOffsetLeft-(rw-j*gap),
                    top:(height-rh)/2,
                    zIndex:tempZindex
                });

            });

            //配置右节点的宽高等属性
            var tempLeftLevel = level;
            var firstFlag = true;   //仅限于第一次
            var tempI = 0;
            leftPic.each(function (i) {

                if(!_this.isOdd && firstFlag){
                    rw = rw/scale;
                    rh = rh/scale;
                    tempI = 1;
                    tempLeftLevel -= 1;
                }
                firstFlag = false;

                $(this).css({
                    width:rw,
                    height:rh,
                    opacity:1/tempLeftLevel,
                    left:gap*tempI,
                    top:(height-rh)/2,
                    zIndex:tempI
                });

                tempI++;
                rw = rw/scale;
                rh = rh/scale;
                tempLeftLevel = tempLeftLevel - 1;

            });

        },

        /**
         * 配置事件信息
         * @private
         */
        _initEvent:function(){

            var _this = this;
            this.rotateFlag = true; //能否运动的标志

            //点击右边按钮
            this.nextBtn.click(function () {
                if(_this.rotateFlag){
                    _this.rotateFlag = false;
                    _this._rotate('left')
                }
            });

            //点击左边按钮
            this.preBtn.click(function () {
                if(_this.rotateFlag){
                    _this.rotateFlag = false;
                    _this._rotate('right')
                }
            });
        },

        /**
         * 进行运动
         * @param dir   运动方向
         * @private
         */
        _rotate:function(dir){
            var _this = this;
            var zIndexArray = [];   //不需要进行动画
            var cbCount = 0;
            var activeFlag = true;//切换激活点的标志

            this.pic.each(function () {
                var $this = $(this),
                    referNode = null,   //参数属性节点
                    activeNode = null;  //激活的节点

                switch (dir){
                    case 'right':
                        referNode = $this.next().length?$this.next():_this.firstPic;
                        break;
                    case 'left':
                        referNode = $this.prev().length?$this.prev():_this.lastPic;
                        break;
                }

                //切换激活节点
                if($this.hasClass('active') && activeFlag){
                    _this.pic.removeClass('active');
                    switch (dir){
                        case 'right':
                            activeNode = $this.prev().length?$this.prev():_this.lastPic;
                            break;
                        case 'left':
                            activeNode = $this.next().length?$this.next():_this.firstPic;
                            break;
                    }
                    activeNode.addClass('active');
                    activeFlag = false;
                }

                //下个或者上个节点的属性
                var width = referNode.css("width"),
                    height = referNode.css('height'),
                    opacity = referNode.css('opacity'),
                    left = referNode.css('left'),
                    top = referNode.css('top'),
                    zIndex = referNode.css('zIndex');

                zIndexArray.push(zIndex)

                //异步执行动画
                $this.animate(
                    {
                        width:width,
                        height:height,
                        opacity:opacity,
                        left:left,
                        top:top
                    },
                    _this.options.speed,
                    function(){
                        _this.rotateFlag = true;

                        ++cbCount;

                        if(cbCount===_this.pic.length){
                            //执行回调函数
                            _this.options.cb();
                        }

                    }
                );

            });

            //单独设置z-index防止进行动画
            this.pic.each(function (i) {
                $(this).css('zIndex', zIndexArray[i]);
            });


        }

    };

    //默认配置参数
    Carousel.DEFAULTS = {
        isAutoPlay:false,   //是否轮播
        width:1000,         //总区域宽度
        height:270,         //总区域的高度
        showWidth:640,      //显示单个图片的宽度
        showHeight:270,      //显示单个图片的高度
        scale:0.9,           //缩放比例
        speed:500           //运动动画
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