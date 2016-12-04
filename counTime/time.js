window.onload = function () {

    new Time({
        id:"time"
    });
};


;
(function () {

    //数字的数组
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

    //目标时间
    var TargeTime = new Date(2016, 11, 8);

    var Left = 346;
    var Top = 100;
    var Radius = 8;

    //小球的颜色
    var Balls = [];  //存储小球的数组
    var Colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

    //当前的时间
    var DiffTime = +TargeTime - +new Date();
    var CurrentHour = parseInt(DiffTime / 1000/60/60, 10),
        CurrentMinute = parseInt(DiffTime / 1000 / 60 % 60, 10),
        CurrentSeconds =  parseInt(DiffTime / 1000 % 60, 10);

    //主函数
    var Time = function (options) {
        this.options = options;
        this.counTimer = null;  //倒计时
        this.init();
    };

    Time.prototype = {
        constructor:Time,
        init:function(){

            this._initStatus();
        },

        //初始化状态
        _initStatus:function(){
            var _this = this;
            this.canvas = document.getElementById(this.options.id);
            this.cxt = this.canvas.getContext("2d");
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
            //进行倒计时
            this.counTimer = setInterval(function () {
                _this._getDiffTime();
            }, 50);

        },

        //倒计时
        _getDiffTime:function(){
            var cxt = this.cxt;
            var diffTime = +TargeTime - +new Date();

            var hour = parseInt(diffTime / 1000/60/60, 10);
            var minute = parseInt(diffTime / 1000 / 60 % 60, 10);
            var seconds = parseInt(diffTime / 1000 % 60, 10);

            if(diffTime>=0){
                cxt.clearRect(0, 0, 1620, 700);
                //小时的十分位
                this._drawArc({
                    index: parseInt(hour / 10,10),
                    left:Left,
                    top:Top
                });
                //当时间不对等的时候，出现彩色小球
                if(parseInt(CurrentHour / 10,10)!=parseInt(hour / 10,10)){
                    this._addBalls({
                        index: parseInt(hour / 10,10),
                        left:Left,
                        top:Top
                    });
                }

                //小时的个位
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

                //冒号
                this._drawArc({
                    index: 10,
                    left:Left+30*(Radius+1),
                    top:Top
                });

                //分钟的十分位
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

                //分钟的个位
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

                //冒号
                this._drawArc({
                    index: 10,
                    left:Left+69*(Radius+1),
                    top:Top
                });

                //秒的十分位
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

                //秒的个位
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

                //更新彩色小球的动画
                this._updateBalls();

            }else{
                clearInterval(this.counTimer);
            }

        },

        /**
         * 插入彩色小球
         * @private
         */
        _addBalls:function(obj){
           var  index = obj.index,
                left = obj.left,
                top = obj.top,
                digit = Digit[index];

            var numArray,
                val;

            // i为对应图像中的y轴，n为对应的x轴
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

        //更新彩色小球的动画
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
         * 描绘时间的函数
         * @param obj   传入的数据类型
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

            // i为对应图像中的y轴，n为对应的x轴
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


    //外部接口
    window['Time'] = Time;


})();