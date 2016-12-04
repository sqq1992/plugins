window.onload = function () {

    new Time({
        id:"time"
    });
};


;
(function () {

    //���ֵ�����
    var Digit =[
            [
                [0,0,1,1,1,0,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,0,1,1,0],
                [0,0,1,1,1,0,0]
            ],//0
            [
                [0,0,0,1,1,0,0],
                [0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [1,1,1,1,1,1,1]
            ],//1
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,1,1],
                [1,1,1,1,1,1,1]
            ],//2
            [
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,1,0,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//3
            [
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,0],
                [0,0,1,1,1,1,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,1,1,0],
                [1,1,1,1,1,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,1]
            ],//4
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//5
            [
                [0,0,0,0,1,1,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//6
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0]
            ],//7
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//8
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0]
            ],//9
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0]
            ]//:
        ];

    //Ŀ��ʱ��
    var TargeTime = new Date(2016, 11, 8);

    var Left = 346;
    var Top = 100;
    var Radius = 8;

    //С�����ɫ
    var Balls = [];  //�洢С�������
    var Colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

    //��ǰ��ʱ��
    var DiffTime = +TargeTime - +new Date();
    var CurrentHour = parseInt(DiffTime / 1000/60/60, 10),
        CurrentMinute = parseInt(DiffTime / 1000 / 60 % 60, 10),
        CurrentSeconds =  parseInt(DiffTime / 1000 % 60, 10);

    //������
    var Time = function (options) {
        this.options = options;
        this.counTimer = null;  //����ʱ
        this.init();
    };

    Time.prototype = {
        constructor:Time,
        init:function(){

            this._initStatus();
        },

        //��ʼ��״̬
        _initStatus:function(){
            var _this = this;
            this.canvas = document.getElementById(this.options.id);
            this.cxt = this.canvas.getContext("2d");
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
            //���е���ʱ
            this.counTimer = setInterval(function () {
                _this._getDiffTime();
            }, 50);

        },

        //����ʱ
        _getDiffTime:function(){
            var cxt = this.cxt;
            var diffTime = +TargeTime - +new Date();

            var hour = parseInt(diffTime / 1000/60/60, 10);
            var minute = parseInt(diffTime / 1000 / 60 % 60, 10);
            var seconds = parseInt(diffTime / 1000 % 60, 10);

            if(diffTime>=0){
                cxt.clearRect(0, 0, 1620, 700);
                //Сʱ��ʮ��λ
                this._drawArc({
                    index: parseInt(hour / 10,10),
                    left:Left,
                    top:Top
                });
                //��ʱ�䲻�Եȵ�ʱ�򣬳��ֲ�ɫС��
                if(parseInt(CurrentHour / 10,10)!=parseInt(hour / 10,10)){
                    this._addBalls({
                        index: parseInt(hour / 10,10),
                        left:Left,
                        top:Top
                    });
                }

                //Сʱ�ĸ�λ
                this._drawArc({
                    index: parseInt(hour % 10,10),
                    left:Left+15*(Radius+1),
                    top:Top
                });
                if(parseInt(CurrentHour % 10,10)!=parseInt(hour % 10,10)){
                    this._addBalls({
                        index: parseInt(hour % 10,10),
                        left:Left+15*(Radius+1),
                        top:Top
                    });
                    CurrentHour = hour;
                }

                //ð��
                this._drawArc({
                    index: 10,
                    left:Left+30*(Radius+1),
                    top:Top
                });

                //���ӵ�ʮ��λ
                this._drawArc({
                    index: parseInt(minute / 10,10),
                    left:Left+39*(Radius+1),
                    top:Top
                });
                if(parseInt(CurrentMinute / 10,10)!=parseInt(minute / 10,10)){
                    this._addBalls({
                        index: parseInt(minute / 10,10),
                        left:Left+39*(Radius+1),
                        top:Top
                    });
                }

                //���ӵĸ�λ
                this._drawArc({
                    index: parseInt(minute % 10,10),
                    left:Left+54*(Radius+1),
                    top:Top
                });
                if(parseInt(CurrentMinute % 10,10)!=parseInt(minute % 10,10)){
                    this._addBalls({
                        index: parseInt(minute % 10,10),
                        left:Left+54*(Radius+1),
                        top:Top
                    });
                }

                //ð��
                this._drawArc({
                    index: 10,
                    left:Left+69*(Radius+1),
                    top:Top
                });

                //���ʮ��λ
                this._drawArc({
                    index: parseInt(seconds / 10,10),
                    left:Left+78*(Radius+1),
                    top:Top
                });
                if(parseInt(CurrentSeconds / 10,10)!=parseInt(seconds / 10,10)){
                    this._addBalls({
                        index: parseInt(seconds / 10,10),
                        left:Left+78*(Radius+1),
                        top:Top
                    });
                }

                //��ĸ�λ
                this._drawArc({
                    index: parseInt(seconds % 10,10),
                    left:Left+93*(Radius+1),
                    top:Top
                });
                if(parseInt(CurrentSeconds % 10,10)!=parseInt(seconds % 10,10)){
                    this._addBalls({
                        index: parseInt(seconds % 10,10),
                        left:Left+93*(Radius+1),
                        top:Top
                    });
                }

                CurrentHour = hour;
                CurrentMinute = minute;
                CurrentSeconds = seconds;

                //���²�ɫС��Ķ���
                this._updateBalls();

            }else{
                clearInterval(this.counTimer);
            }

        },

        /**
         * �����ɫС��
         * @private
         */
        _addBalls:function(obj){
           var  index = obj.index,
                left = obj.left,
                top = obj.top,
                digit = Digit[index];

            var numArray,
                val;

            // iΪ��Ӧͼ���е�y�ᣬnΪ��Ӧ��x��
            for(var i= 0,j=digit.length;i<j;i++){
                numArray = digit[i];

                for(var n= 0,m=numArray.length;n<m;n++){
                    val = numArray[n];
                    if(val===1){
                        Balls.push({
                            x:left+Radius+2*Radius*n+n*1,
                            y:top+Radius+2*Radius*i+i*1,
                            vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                            vy:-5,
                            g:1.5+Math.random(),
                            color:Colors[Math.floor(Math.random()*Colors.length)]
                        })
                    }
                }
            }
        },

        //���²�ɫС��Ķ���
        _updateBalls:function(){
            var ball,
                cxt = this.cxt;
            for(var i= 0,j=Balls.length;i<j;i++){
                ball = Balls[i];
                cxt.fillStyle = ball.color;
                cxt.beginPath();
                ball.x += ball.vx;
                ball.y += ball.vy;
                ball.vy += ball.g;
                if(ball.y>=(this.canvasHeight-Radius)){
                    ball.y = this.canvasHeight - Radius;
                    ball.vy = -ball.vy * 0.75;
                }

                cxt.arc(ball.x, ball.y, Radius, 0, 2 * Math.PI, true);
                cxt.closePath();
                cxt.fill();

            }
        },

        /**
         * ���ʱ��ĺ���
         * @param obj   �������������
         * @private
         */
        _drawArc:function(obj){
            var cxt = this.cxt,
                index = obj.index,
                left = obj.left,
                top = obj.top,
                digit = Digit[index];
            cxt.fillStyle = 'rgb(0,102,153)';

            var numArray,
                val;

            // iΪ��Ӧͼ���е�y�ᣬnΪ��Ӧ��x��
            for(var i= 0,j=digit.length;i<j;i++){
                numArray = digit[i];

                for(var n= 0,m=numArray.length;n<m;n++){
                    val = numArray[n];
                    if(val===1){
                        cxt.beginPath();
                        cxt.arc(left+Radius+2*Radius*n+n*1,top+Radius+2*Radius*i+i*1,Radius,0,2*Math.PI,true);
                        cxt.closePath();
                        cxt.fill();
                    }
                }
            }


        }

    };


    //�ⲿ�ӿ�
    window['Time'] = Time;


})();