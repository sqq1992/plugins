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

            //�����¼���Ϣ
            if(this.picLength===1){

            }else{
                this._initEvent();
            }
        },

        //���ýڵ���Ϣ
        _configDom:function(){
            this.picLength = this.pic.size();

            if(this.picLength===1){

            }else if(this.picLength===2){

            }else if(this.picLength>2){
                if(this.picLength%2===0){
                    this.isOdd = false;
                    //this.picBox.append(this.pic.first().clone());
                    //this.pic = this.element.find(".pic-box li");    //ͼƬ�б�
                }else{
                    this.isOdd = true;
                }
            }
            this.firstPic = this.pic.first();
            this.lastPic = this.pic.last();

        },

        //����λ����Ϣ
        _setPos:function(){
            var _this = this;
            var options = this.options;
            var SlicePic = this.pic.slice(1),
                sliceSize = Math.ceil(SlicePic.size() / 2),
                level = Math.ceil(SlicePic.size() / 2),  //
                rightPic = SlicePic.slice(0, sliceSize), //�ұߵ�ͼƬ
                leftPic = SlicePic.slice(sliceSize),    //��ߵ�ͼƬ
                scale = options.scale,                  //���ű���
                width = options.width,                  //����Ŀ��
                height = options.height;                //����ĸ߶�

            //����������Ŀ��
            this.element.css({
                width:width,
                height:height
            });

            //һЩ����������ֵ
            var rw = options.showWidth,
                rh = options.showHeight,
                gap = ((options.width-options.showWidth)/2)/level;  //�㼶���

            var fistLeft = (options.width - options.showWidth) / 2;
            var fixOffsetLeft = fistLeft+rw;

            //���õ�һ���ڵ�
            this.firstPic.css({
                width: rw,
                height: rh,
                opacity: 1,
                left: fistLeft,
                top: (height - rh) / 2,
                zIndex: level + 1
            }).addClass('active');

            //�������ҵİ�ť����
            this.preBtn.css({
               width:fistLeft,
               zIndex:level+1
            });

            this.nextBtn.css({
                width:fistLeft,
                zIndex:level+1
            });

            //�����ұ߽ڵ�Ŀ�ߵ�����
            rightPic.each(function (i) {

                rw = rw * scale;
                rh = rh * scale;

                var j = i;  //��ʱ���ж��б������
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

            //�����ҽڵ�Ŀ�ߵ�����
            var tempLeftLevel = level;
            var firstFlag = true;   //�����ڵ�һ��
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
         * �����¼���Ϣ
         * @private
         */
        _initEvent:function(){

            var _this = this;
            this.rotateFlag = true; //�ܷ��˶��ı�־

            //����ұ߰�ť
            this.nextBtn.click(function () {
                if(_this.rotateFlag){
                    _this.rotateFlag = false;
                    _this._rotate('left')
                }
            });

            //�����߰�ť
            this.preBtn.click(function () {
                if(_this.rotateFlag){
                    _this.rotateFlag = false;
                    _this._rotate('right')
                }
            });
        },

        /**
         * �����˶�
         * @param dir   �˶�����
         * @private
         */
        _rotate:function(dir){
            var _this = this;
            var zIndexArray = [];   //����Ҫ���ж���
            var cbCount = 0;
            var activeFlag = true;//�л������ı�־

            this.pic.each(function () {
                var $this = $(this),
                    referNode = null,   //�������Խڵ�
                    activeNode = null;  //����Ľڵ�

                switch (dir){
                    case 'right':
                        referNode = $this.next().length?$this.next():_this.firstPic;
                        break;
                    case 'left':
                        referNode = $this.prev().length?$this.prev():_this.lastPic;
                        break;
                }

                //�л�����ڵ�
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

                //�¸������ϸ��ڵ������
                var width = referNode.css("width"),
                    height = referNode.css('height'),
                    opacity = referNode.css('opacity'),
                    left = referNode.css('left'),
                    top = referNode.css('top'),
                    zIndex = referNode.css('zIndex');

                zIndexArray.push(zIndex)

                //�첽ִ�ж���
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
                            //ִ�лص�����
                            _this.options.cb();
                        }

                    }
                );

            });

            //��������z-index��ֹ���ж���
            this.pic.each(function (i) {
                $(this).css('zIndex', zIndexArray[i]);
            });


        }

    };

    //Ĭ�����ò���
    Carousel.DEFAULTS = {
        isAutoPlay:false,   //�Ƿ��ֲ�
        width:1000,         //��������
        height:270,         //������ĸ߶�
        showWidth:640,      //��ʾ����ͼƬ�Ŀ��
        showHeight:270,      //��ʾ����ͼƬ�ĸ߶�
        scale:0.9,           //���ű���
        speed:500           //�˶�����
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