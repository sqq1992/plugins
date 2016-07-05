'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

//帧动画的定时器
var requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame ||
		   window.oRequestAnimationFrame ||
           function(callBack){
			   window.setTimeout(callBack, callBack.interval || DEFAULT_INTERVAL);
		   }
})();

//取消帧动画的定时器
var cancelAnimationFrame = (function(){
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		};
})();

/**
 * Timline时间轴类
 * @constructor
 */
function Timeline() {
	this.animationHandler = 0;	//动画的定时器
	this.state = STATE_INITIAL; //动画的状态
}

/**
 * 开始动画帧的函数
 * @param interval	传入的1帧的间隔时间
 */
Timeline.prototype.start = function (interval) {
	//如果动画状态为开始，则返回
	if(this.state===STATE_START) return this;

	//改变动画的状态为开始
	this.state = STATE_START;

	//动画帧的间隔时间
	this.interval = interval || DEFAULT_INTERVAL;

	//开始动画帧的函数
	this.startTimeline(+new Date());

};

/**
 * 动画停止的函数
 * @returns {Timeline}
 */
Timeline.prototype.stop = function () {
	//如果动画状态不为开始的话，则直接返回
	if(this.state!==STATE_START) return this;

	//当前动画状态为停止
	this.state = STATE_STOP;

	if(this.startTime){
		//动画结束到这个动画开始的时间间隔
		this.dur = +new Date() - this.startTime;
	}

	//停止动画
	cancelAnimationFrame(this.animationHandler);

};

Timeline.prototype.restart = function () {
	//如果动画状态不为停止直接返回
	if(this.state!==STATE_STOP){
		return;
	}
	//如果动画间隔和动画帧时间不存在，直接返回
	if(!this.dur || !this.interval){
		return;
	}

	//动画状态变为开始
	this.state = STATE_START;

	//重新执行动画
	this.startTimeline(+new Date() - this.dur);
};

/**
 * 帧动画执行的回调函数
 * @param time	从动画开始到当前执行时间的差值
 */
Timeline.prototype.onenterframe = function (time) {

};


/**
 * 开始动画的函数
 * @param nowTime	传入的开始时间
 */
Timeline.prototype.startTimeline = function (nowTime) {
	var _this = this;
	//记录上一次回调的时间
	var lastTick = +new Date();

	//动画帧开始的时间
	this.startTime = nowTime;

	//动画帧的间隔时间
	nextTick.interval = this.interval;
	//执行帧动画
	nextTick();

	function nextTick(){
		var now = +new Date();

		//帧动画执行的定时器
		_this.animationHandler = requestAnimationFrame(nextTick);

		//如果当前的时间帧动画的时间间隔大于等于指定的时间间隔的话，则执行回调函数
		if(now-lastTick>=_this.interval){
			_this.onenterframe(now - nowTime);
			lastTick = now;
		}

	}

};


var ani = new Timeline();
ani.onenterframe = function () {
	console.log(333);
};
ani.start();











