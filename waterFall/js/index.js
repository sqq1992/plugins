
window.onload = function () {

    //�����ٲ�����
    WaterFall.init();
};

/**
 * ����js�����ٲ���
 */
;
(function () {
    var WaterFall = function () {

        //���û�����Ϣ
        this._init();
        //���ú�����Ϣ
        this._initFunc();
    };
    WaterFall.prototype = {
        constructor:WaterFall,
        //���û�����Ϣ
        _init:function(){
            this.parent = $("main");        //���ڵ��main
            this.PicBox = getClassName(this.parent,"pic-box");  //��classNameΪmain���ӽڵ�
        },
        //���ú�����Ϣ
        _initFunc:function(){
            var _this = this;
            //�����ٲ�����ͼƬ
            this._insertWaterFallPic();

            //���ݹ��ֻ���������ٲ���ͼƬ
            var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]}; //Ҫ������ص�ͼƬ
            var datas = dataInt.data;
            window.onscroll = function () {
                if(_this._checkScrollPic()){
                    var documentFra = document.createDocumentFragment();    //�����ĵ���Ƭ
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
                    _this.parent.appendChild(documentFra);  //���ĵ���Ƭ���domȫ�����븸Ԫ����
                    //����ˢ���ٲ�����ͼƬ
                    _this.PicBox = getClassName(_this.parent,"pic-box");  //��classNameΪmain���ӽڵ�
                    _this._insertWaterFallPic();
                }
            };
        },
        //�����ٲ�����ͼƬ
        _insertWaterFallPic:function(){
            var windowWidth = document.documentElement.clientWidth; //��Ļ�Ŀ��
            var onePicBoxWidth = this.PicBox[0].offsetWidth;        //����ͼƬ����Ŀ��
            var firstRows = Math.floor(windowWidth / onePicBoxWidth);   //1���ܷŶ��ٸ�ͼƬ����
            this.parent.style.width = firstRows * onePicBoxWidth + "px";    //���ڵ�Ŀ��

            var firstHeightArry = [];   //��ŵ�һ��ͼƬ����ĸ߶�
            var minHeight = 0;  //�����и߶���С��
            var firstHeightArryIndex = 0;   //��һ��ͼƬ���ض�ֵ����ֵ
            //for(var i=0;i<firstRows;i++){
            //    firstHeightArry.push(this.PicBox[i].offsetHeight);
            //}
            for(var i= 0,j = this.PicBox.length;i<j;i++){
                if(i<firstRows){    //��һ�в������ͼƬ������
                    firstHeightArry.push(this.PicBox[i].offsetHeight);
                }else{              //��һ��֮������С��ͼƬ�߶��ϲ���֮��ͼƬ��
                    minHeight = Math.min.apply(null, firstHeightArry);  //��С�߶�
                    firstHeightArryIndex = this._searchIndex(firstHeightArry, minHeight);   //��С�߶ȶ�Ӧ������
                    //����cssֵ
                    this.PicBox[i].style.cssText = "position:absolute;top:" + minHeight + "px;left:" + firstHeightArryIndex * onePicBoxWidth + "px";
                    //��ԭ�����������ڼ����²���ͼƬ����ĸ߶�
                    firstHeightArry[firstHeightArryIndex] += this.PicBox[i].offsetHeight;
                }
            }
        },
        //Ѱ�ҳ�ĳ��ֵ�������е�����
        _searchIndex:function(arry,val){
            for(var i in arry){
                if(val ==arry[i]){
                    return i;
                }
            }
        },
        //ƥ����ֹ���ʱ���Ƿ������ͼƬ������
        _checkScrollPic:function(){
            var lastPicBox = this.PicBox[this.PicBox.length - 1];               //���һ��ͼƬ
            var picBoxTopHeight = lastPicBox.offsetTop+Math.floor(lastPicBox.offsetHeight/2);  //���һ��ͼƬ���붥���ľ������������һ��ĸ߶�
            var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;  //���ֻ����ĸ߶�
            var winddowHeight = document.documentElement.clientHeight;
            return (picBoxTopHeight < (srcollTop + winddowHeight)) ? true : false;  //���ͼƬ��������������������һ��߶�С�ڹ��ֵĻ�����ҳ��߶�֮����,����true
        }

    };

    //��������
    WaterFall.init = function () {
        return new this();
    };

    //�ⲿ�ӿ�
    window['WaterFall'] = WaterFall;

})();

/**
 * ��id��Ѱ�ҽڵ�
 * @param id    �����id��
 * @returns {Element}   Ѱ�ҵ���id�ڵ�
 */
function $(id){
    return document.getElementById(id);
}

/**
 * ����Ѱ��ƥ���className�Ľڵ�
 * @param node  ���ĸ��ڵ�
 * @param clsName  ����ƥ���className���ӽڵ�
 */
function getClassName(node,clsName){
    var newArry = [];
    var parent = node ? node : document;    //����и��ڵ�,��Ӹ��ڵ㿪ʼ�飬�����document��ʼ��
    var allElement = parent.getElementsByTagName("*");
    var regClassName = new RegExp('(\\s|^)'+clsName+'(\\s|$)');
    for(var i= 0,j = allElement.length;i<j;i++){
        if(regClassName.test(allElement[i].className)){
            newArry.push(allElement[i]);
        }
    }
    return newArry;
}

