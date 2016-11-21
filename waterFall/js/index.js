
window.onload = function () {

    //开启瀑布流的
    WaterFall.init();
};

/**
 * 关于js控制瀑布流
 */
;
(function () {
    var WaterFall = function () {

        //配置基本信息
        this._init();
        //配置函数信息
        this._initFunc();
    };
    WaterFall.prototype = {
        constructor:WaterFall,
        //配置基本信息
        _init:function(){
            this.parent = $("main");        //父节点的main
            this.PicBox = getClassName(this.parent,"pic-box");  //它className为main的子节点
        },
        //配置函数信息
        _initFunc:function(){
            var _this = this;
            //插入瀑布流的图片
            this._insertWaterFallPic();

            //根据滚轮滑动来添加瀑布流图片
            var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]}; //要按需加载的图片
            var datas = dataInt.data;
            window.onscroll = function () {
                if(_this._checkScrollPic()){
                    var documentFra = document.createDocumentFragment();    //创建文档碎片
                    for(var i= 0,j = datas.length;i<j;i++){
                        var PicBox = document.createElement("div");
                        PicBox.className = "pic-box";
                        documentFra.appendChild(PicBox);
                        var box = document.createElement("div");
                        box.className = "box";
                        PicBox.appendChild(box);
                        var img = document.createElement("img");
                        img.src = "img/" + datas[i].src;
                        box.appendChild(img);
                    }
                    _this.parent.appendChild(documentFra);  //将文档碎片里的dom全部放入父元素中
                    //重新刷新瀑布流的图片
                    _this.PicBox = getClassName(_this.parent,"pic-box");  //它className为main的子节点
                    _this._insertWaterFallPic();
                }
            };
        },
        //插入瀑布流的图片
        _insertWaterFallPic:function(){
            var windowWidth = document.documentElement.clientWidth; //屏幕的宽度
            var onePicBoxWidth = this.PicBox[0].offsetWidth;        //单个图片区域的宽度
            var firstRows = Math.floor(windowWidth / onePicBoxWidth);   //1排能放多少个图片区域
            this.parent.style.width = firstRows * onePicBoxWidth + "px";    //父节点的宽度

            var firstHeightArry = [];   //存放第一列图片区域的高度
            var minHeight = 0;  //数组中高度最小的
            var firstHeightArryIndex = 0;   //第一列图片的特定值索引值
            //for(var i=0;i<firstRows;i++){
            //    firstHeightArry.push(this.PicBox[i].offsetHeight);
            //}
            for(var i= 0,j = this.PicBox.length;i<j;i++){
                if(i<firstRows){    //第一行插入各个图片的区域
                    firstHeightArry.push(this.PicBox[i].offsetHeight);
                }else{              //第一行之后，往最小的图片高度上插入之后图片，
                    minHeight = Math.min.apply(null, firstHeightArry);  //最小高度
                    firstHeightArryIndex = this._searchIndex(firstHeightArry, minHeight);   //最小高度对应的索引
                    //设置css值
                    this.PicBox[i].style.cssText = "position:absolute;top:" + minHeight + "px;left:" + firstHeightArryIndex * onePicBoxWidth + "px";
                    //在原来的数组内在加上新插入图片区域的高度
                    firstHeightArry[firstHeightArryIndex] += this.PicBox[i].offsetHeight;
                }
            }
        },
        //寻找出某个值在数组中的索引
        _searchIndex:function(arry,val){
            for(var i in arry){
                if(val ==arry[i]){
                    return i;
                }
            }
        },
        //匹配滚轮滚动时，是否按需加载图片的条件
        _checkScrollPic:function(){
            var lastPicBox = this.PicBox[this.PicBox.length - 1];               //最后一个图片
            var picBoxTopHeight = lastPicBox.offsetTop+Math.floor(lastPicBox.offsetHeight/2);  //最后一个图片距离顶部的距离加上它自身一半的高度
            var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚轮滑动的高度
            var winddowHeight = document.documentElement.clientHeight;
            return (picBoxTopHeight < (srcollTop + winddowHeight)) ? true : false;  //如果图片到顶部距离加上它自身的一半高度小于滚轮的滑动和页面高度之后是,返回true
        }

    };

    //启动函数
    WaterFall.init = function () {
        return new this();
    };

    //外部接口
    window['WaterFall'] = WaterFall;

})();

/**
 * 从id上寻找节点
 * @param id    传入的id名
 * @returns {Element}   寻找到的id节点
 */
function $(id){
    return document.getElementById(id);
}

/**
 * 关于寻找匹配的className的节点
 * @param node  它的父节点
 * @param clsName  它所匹配的className的子节点
 */
function getClassName(node,clsName){
    var newArry = [];
    var parent = node ? node : document;    //如果有父节点,则从父节点开始查，否则从document开始查
    var allElement = parent.getElementsByTagName("*");
    var regClassName = new RegExp('(\\s|^)'+clsName+'(\\s|$)');
    for(var i= 0,j = allElement.length;i<j;i++){
        if(regClassName.test(allElement[i].className)){
            newArry.push(allElement[i]);
        }
    }
    return newArry;
}

