$(function () {

    //开启相册放大功能
    ShowPic.init({length: 17});

});


/**
 * 相册的放大功能
 */
;(function($){
    var ShowPic = function(obj){
        //外部参数配置
        this.sumLen = obj.length;

        //配置基本信息
        this._init();
        //初始化函数信息
        this._initFunction();
    };
    ShowPic.prototype = {
        constructor:ShowPic,
        //配置基本信息
        _init:function(){
            this.container = $("#container");   //相册存放区域
            this.window = $(window);
            this.windowWidth = this.window.width();
            this.windowHeight = this.window.height();
            this.padding = 2;                   //图片的间隙
            this.picW = Math.floor((this.window.width()-6)/4);  //每个图片的宽高
            this.bigPicBox = $("#big-pic-box"); //大图区域
            this.bigPic = $("#big-pic");    //大图的图片
            this.bigPicId = 0;  //当前大图的id
        },
        //初始化函数信息
        _initFunction:function(){
            //插入小图片信息
            this._insertPic();
            //点击小图片显示大图片
            this._showBigPic();
        },
        //插入小的图片信息
        _insertPic:function(){
            var sumStr = "";    //总的插入的字符串
            var paddingLeft = 2;
            var imgSrc = "";    //图片地址
            var canvas = null;  //canvas的临时节点对象
            var imgObect = null;  //图片的临时对象
            for(var i=1;i<=this.sumLen;i++){
                paddingLeft = i%4==1?0:2;
                sumStr += '<li data-id="'+i+'" class="img-list animated bounceIn" style="width: '+this.picW+'px;height:'+this.picW+'px;padding-left:'+paddingLeft+'px;padding-top:'+this.padding+'px"><canvas id="cvs'+i+'"></canvas></li>';
                imgSrc = "img/" + i + ".jpg";
                imgObect = new Image();
                imgObect.index = i;
                imgObect.onload = function () {     //图片对象加载完毕
                    var cvs = $("#cvs"+this.index+"")[0].getContext("2d");
                    cvs.width = this.width;
                    cvs.height = this.height;
                    cvs.drawImage(this, 0, 0);
                };
                imgObect.src = imgSrc;
            }
            this.container.html(sumStr);
        },
        //点击小图片显示大图片
        _showBigPic:function(){
            var _this = this;
            //点击小图片，放大图片
            this.container.delegate('li', 'tap', function () {
                var id = _this.bigPicId = $(this).attr("data-id");
                _this._bigPicShow(id);
            });
            //点击大图片，隐藏大图片，显示小图片
            this.bigPicBox.tap(function () {
                _this.bigPicBox.hide();
            });

            var lock = false;
            //视图切换往左移
            this.bigPicBox.swipeLeft(function () {
                if(lock){
                    return;
                }
                lock = true;
                _this.bigPicId++;
                if(_this.bigPicId>this.sumLen){
                    _this.bigPicId = this.sumLen;
                }


                _this._bigPicShow(_this.bigPicId,function(){
                    _this.bigPic[0].addEventListener('webkitAnimationEnd', function () {
                        _this.bigPic.removeClass("animated bounceInRight");
                        _this.bigPic[0].removeEventListener("webkitAnimationEnd");
                        lock = false;
                    }, false);
                    _this.bigPic.addClass("animated bounceInRight");
                });

            });
            //视图往右边移
            this.bigPicBox.swipeRight(function () {
                if(lock){
                    return;
                }
                lock = true;
                _this.bigPicId--;
                if(_this.bigPicId<1){
                    _this.bigPicId = 1;
                }


                _this._bigPicShow(_this.bigPicId,function(){
                    _this.bigPic[0].addEventListener('webkitAnimationEnd', function () {
                        _this.bigPic.removeClass("animated bounceInLeft");
                        _this.bigPic[0].removeEventListener("webkitAnimationEnd");
                        lock = false;
                    }, false);
                    _this.bigPic.addClass("animated bounceInLeft");
                });

            });
        },
        //大图显示
        _bigPicShow:function(id,callBack){
            var _this = this;
            var imgSrc = "img/" + id + ".large.jpg";
            var imgObj = new Image();
            _this.bigPic.removeAttr("src");
            imgObj.onload = function () {
                var width = this.width;
                var height = this.height;
                var realW = parseInt((_this.windowWidth - _this.windowHeight*width/height) / 2);
                var realH = parseInt((_this.windowHeight - _this.windowWidth*height/width) / 2);
                if(height/width>1.2){
                    _this.bigPic.css({'height': _this.windowHeight,'padding-left':realW});
                }else{
                    _this.bigPic.css({'width': _this.windowWidth,'padding-top':realH});
                }
                _this.bigPic.attr("src",this.src);
            };
            imgObj.src = imgSrc;
            this.bigPicBox.show();
            //回调函数存在则执行回调函数
            callBack && callBack();
        }
    };

    //启动函数
    ShowPic.init = function (obj) {
        return new this(obj);
    };

    //外部接口
    window['ShowPic'] = ShowPic;

})($);