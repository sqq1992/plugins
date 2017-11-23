/**
 * 轮播插件
 */
;
(function ($) {

    /**
     * 轮班插件的
     * @param element   显示或隐藏的节点
     * @param options   传入的配置参数
     * @constructor
     */
    var TurnShow = function (element,options) {
        this.element = element;
        this.options = options;

        //列表显示区域和列表们
        this.turnGoodListBox = this.element.find(".turn-good-list");
        this.turnGoodList = this.turnGoodListBox.find("li");
        this.turnGoodListSize = this.turnGoodList.size();

        //有2张以上图片才可轮播
        if(this.turnGoodListSize>=2){
            this.init();
        }
    };

    TurnShow.prototype = {
        constructor:TurnShow,
        init:function () {
            this._config();
            this._initEvent();

        },

        //配置基本信息
        _config:function () {


            this.turnWidth = this.turnGoodList.first().width();     //1张列表的宽度

            //大于1张图片才可轮播
            this.turnGoodList.last().clone(true).insertBefore(this.turnGoodList.first());
            this.turnGoodList.first().clone(true).appendTo(this.turnGoodListBox);

            //重新获取列表们和数量
            this.turnGoodList = this.turnGoodListBox.find("li");
            this.turnGoodListSize = this.turnGoodList.size();

            //设置显示宽度和初试激活位置
            this.turnGoodListBox.width(this.turnGoodListSize * this.turnWidth);
            this.initPos = -this.turnWidth;                 //初始位置
            this.turnGoodListBox.css("margin-left", -this.turnWidth);
            this.turnGoodList.eq(1).addClass("active");

            //配置信息
            this.index = 0;     //当前索引
            this.allIndex = this.turnGoodListSize - 3;  //总共的索引
            this.moveFlag = true;   //能否动画的标志
            this.turnShowAni = null;    //定时动画
        },

        _initEvent:function () {
            var _this = this;
            this.element
                .on("click", '.pre-btn', function () {        //上一张,向右运动
                    _this._run("right");
                })
                .on("click", '.next-btn', function () {       //下一张,向左运动
                    _this._run("left");
                });

            //定时动画
            this.turnShowAni = setInterval(function () {
                _this._run("left");
            }, 2500);


            this.element.hover(function () {
                clearInterval(_this.turnShowAni);
            }, function () {
                _this.turnShowAni = setInterval(function () {
                    _this._run("left");
                }, 2500);
            });

        },

        /**
         * 进行运动
         * @param type  运动方式
         * @private
         */
        _run:function (type) {
            var _this = this;
            if(!this.moveFlag){
                return false;
            }
            this.moveFlag = false;

            if(type==="left"){
                this.index++;
            }else if(type==="right"){
                this.index--;
            }

            //设置位置
            this.pos = this.initPos - this.index * this.turnWidth;

            this.turnGoodListBox.animate({
                "margin-left":this.pos
            }, function () {
                _this.moveFlag = true;
                
                //针对第一个列表和最后个列表做特殊处理
                if(_this.index<0){
                    _this.index = _this.allIndex;
                }

                if(_this.index>_this.allIndex){
                    _this.index = 0;
                }
                _this.pos = _this.initPos - _this.index * _this.turnWidth;
                _this.turnGoodListBox.css('margin-left', _this.pos);

                //修改列表的激活位置
                var listIndex = _this.index + 1;
                _this.turnGoodList.removeClass("active").eq(listIndex).addClass("active");
                
            });



        }




    };

    //默认配置参数
    TurnShow.DEFAULTS = {
        backdrop:true,  //支持动画背景
        show:true   //点击默认是否显示弹窗
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

            //插件的实列存放在bs.popup的html标签下
            var data = $this.data('bs.TurnShow');     //存放插件实列
            if(!data) $this.data('bs.TurnShow',data = new TurnShow($this,options));


        });
    };

    
})(jQuery);






















