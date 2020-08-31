



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
        this.viewList = this.element.find(".turn-show-visible-box");
        this.lists = this.viewList.find(".turn-show-list");
        this.ownedLen = this.lists.length;

        //配置页面宽度和单个移动宽度
        var allWidth = this.viewList.width();
        this.showLength = this.options.showLength;
        this.oneWidth = allWidth / this.showLength;

        //当前的索引
        this.index = 0;
        this.flag = true;
    };


    TurnShow.prototype._setLoopStructure = function () {
        var showLength = this.showLength,
            ownedLen = this.ownedLen,
            oneWidth = this.oneWidth,
            prevNodes = this.lists.slice(ownedLen - showLength, ownedLen).clone(true),
            nextNodes = this.lists.slice(0, showLength).clone(true);

        this.viewList.prepend(prevNodes);
        this.viewList.append(nextNodes);

        //配置新的页面宽度和结构
        var newList = this.viewList.find(".turn-show-list");
        newList.width(this.oneWidth);
        var newListLen = newList.size();
        this.viewList.width(oneWidth * newListLen);

        //配置初始位置
        this.initPosition = -showLength * oneWidth;
        this.viewList.css("margin-left",+ this.initPosition + "px");

        //配置索引
        this.firstIndex = -showLength;
        this.lastIndex = ownedLen;
        this.leftRecoverIndex = ownedLen - showLength;
        this.rightRecoverIndex = 0;

    };

    TurnShow.prototype._setStructure = function () {
        var showLength = this.showLength,
            ownedLen = this.ownedLen,
            oneWidth = this.oneWidth;


        //配置新的页面宽度和结构
        var newList = this.viewList.find(".turn-show-list");
        newList.width(this.oneWidth);
        var newListLen = newList.size();
        this.viewList.width(oneWidth * newListLen);

        //配置初始位置
        this.initPosition = 0;
        this.viewList.css("margin-left",+ this.initPosition + "px");

        //配置索引
        this.firstIndex = 0;
        this.lastIndex = ownedLen - showLength;

        if(this.index<=this.firstIndex){
            this.element.find('.prev-btn').addClass("disabled");
        }

        if(this.index>=this.lastIndex){
            this.element.find('.next-btn').addClass("disabled");
        }


    };


    TurnShow.prototype.init = function () {

        this._config();

        if(this.options.isLoop){
            if(this.ownedLen<=this.showLength) return false;
            this._setLoopStructure();
            this._initLoopEvent();
        }else {
            this._setStructure();
            this._initEvent();
        }

    };

    TurnShow.prototype._LoopRun = function (direction) {
        var _this = this;
        var index = this.index,
            oneWidth = this.oneWidth,
            position = this.initPosition - oneWidth * index;

        this.viewList.animate({
            "margin-left":position+"px"
        },200,function () {
            _this.flag = true;

            var newPoisition;
            if(direction==="right"){
                if(index<=_this.firstIndex){
                    _this.index = _this.leftRecoverIndex;
                    newPoisition = _this.initPosition - oneWidth * _this.index;
                    _this.viewList.css("margin-left", newPoisition + "px");
                }

            }else if(direction==="left"){
                if(index>=_this.lastIndex){
                    _this.index = _this.rightRecoverIndex;
                    newPoisition = _this.initPosition - oneWidth * _this.index;
                    _this.viewList.css("margin-left", newPoisition + "px");
                }
            }
        })
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

            if(_this.index<=_this.firstIndex){
                _this.element.find('.prev-btn').addClass("disabled");
            }else {
                _this.element.find('.prev-btn').removeClass("disabled");
            }

            if(_this.index>=_this.lastIndex){
                _this.element.find('.next-btn').addClass("disabled");
            }else {
                _this.element.find('.next-btn').removeClass("disabled");
            }

        })
    };

    TurnShow.prototype._initLoopEvent = function () {
        var _this = this;
        this.element
            .on("click", '.prev-btn', function () {

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index--;
                _this._LoopRun('right');

            })
            .on("click", '.next-btn', function () {

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index++;
                _this._LoopRun('left')

            })

    };

    TurnShow.prototype._initEvent = function () {
        var _this = this;
        this.element
            .on("click", '.prev-btn', function () {
                var $this = $(this);

                if($this.hasClass("disabled")){
                    return false;
                }

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index--;
                _this._run('right');

            })
            .on("click", '.next-btn', function () {
                var $this = $(this);

                if($this.hasClass("disabled")){
                    return false;
                }

                if(!_this.flag) return false;
                _this.flag = false;
                _this.index++;
                _this._run('left')

            })

    };





    //默认配置参数
    TurnShow.DEFAULTS = {
        showLength: 3,
        isLoop: true
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