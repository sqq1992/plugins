/**
 * ��תľ��Ĳ��
 */
;
(function ($) {

    var Carousel = function (element,option) {
        this.element = element;     //��ǰ�ڵ�
        this.options = option;      //��ǰ���ò���

        this.pic = this.element.find(".pic-box li");    //ͼƬ�б�
        this.picBox = this.element.find(".pic-box");    //ͼƬ����
        this.preBtn = this.element.find(".pre-btn");    //����ť
        this.nextBtn = this.element.find(".next-btn");  //���Ұ�ť

        //��ʼ��
        this.init();
    };

    Carousel.prototype = {
        constructor:Carousel,

        //��ʼ��
        init:function(){

            //���ýڵ���Ϣ
            this._configDom();

            //����λ����Ϣ
            this._setPos();

        },

        //���ýڵ���Ϣ
        _configDom:function(){
            this.picLength = this.pic.size();
            if(this.picLength%2===0){
                this.picBox.append(this.pic.first().clone());
                this.pic = this.element.find(".pic-box li");    //ͼƬ�б�
            }
            this.firstPic = this.pic.first();
            this.lastPic = this.pic.last();

            console.log()
        },

        //����λ����Ϣ
        _setPos:function(){
            var options = this.options;
            var SlicePic = this.pic.slice(1),
                sliceSize = SlicePic.size() / 2,
                level = Math.floor(this.pic.size()/2),  //
                rightPic = SlicePic.slice(0, sliceSize), //�ұߵ�ͼƬ
                leftPic = SlicePic.slice(sliceSize);    //��ߵ�ͼƬ

            //����������Ŀ��
            this.element.css({
                width:options.width,
                height:options.height
            });

            //�����ұ߽ڵ�Ŀ��
            var rw = options.showWidth,
                rh = options.showHeight,
                gap = ((options.width-options.showWidth)/2)/level;

            var fistLeft = (options.width - options.showWidth) / 2;
            var fixOffsetLeft = fistLeft+rw;
            rightPic.each(function () {

            });


        }


    };

    //Ĭ�����ò���
    Carousel.DEFAULTS = {
        isAutoPlay:false,   //�Ƿ��ֲ�
        width:1000,         //��������
        height:270,         //������ĸ߶�
        showWidth:640,      //��ʾ����ͼƬ�Ŀ��
        showHeight:270      //��ʾ����ͼƬ�ĸ߶�
    };

    $.fn.carousel = function (option) {

        return this.each(function () {
            var $this = $(this);        //��ǰҪ��ʾ�Ĳ������jq�ڵ�
            var options = $.extend({}, Carousel.DEFAULTS, typeof option === "object" && option);  //���ò���

            var data = $this.data('carousel');     //��Ų��ʵ��
            if(!data) $this.data('carousel',data = new Carousel($this,options));

        });

    };

})(jQuery);