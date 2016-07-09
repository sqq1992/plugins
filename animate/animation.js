'use strict';


//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;


/**
 * 简单的函数封装，执行callback
 * @param callback 执行的函数
 */
function next(callback) {
	callback && callback();
}

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
	this.taskQueue = [];			//任务队列
	this.timeline = new Timeline();	//时间轴对象
	this.state = STATE_INITIAL;		//初始化状态
	this.index = 0;
}

/**
 * 添加一个同步任务，预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {

	//创建任务
	var taskFn = function (next) {
		loadImag(imglist,next);
	};

	//同步任务
	var type = TASK_SYNC;

	//添加任务
	return this._add(taskFn, type);

};

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组
 * @param imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {

	var len = positions.length,
		taskFn,
		type;

	if(len){
		var _this = this;
		taskFn = function (next,time) {

			if(imageUrl){
				ele.style.backgroundImage = "url(" + imageUrl + ")";
			}

			//获取当前的索引值
			var index = Math.min(time / _this.interval | 0, len - 1);
			var position = positions[index].split(' ');

			//改变当前dom的图片position
			ele.style.backgroundPosition = position[0] + "px " + positions[1] + "px";

			//当前任务执行完毕,执行回调
			if(index===len-1){
				next();
			}
		};
		type = TASK_ASYNC;
	}else{
		taskFn = next;
		type = TASK_SYNC;
	}

	return this._add(taskFn, type);
};

/**
 * 添加一个异步定时任务，通过定时改变背景图片地址，实现帧动画
 * @param ele dom(Image对象)
 * @param imglist 图片地址数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {
	var len = imglist.length,
		taskFn,
		type;

	if(len){
		var _this = this;
		taskFn = function (next,time) {
			//当前图片的索引
			var index = Math.min(time / _this.interval | 0, len - 1);
			//改变图片的url
			ele.src = imglist[index];
			//当前任务执行完毕
			if(index===len-1){
				next();
			}
		};
		type = TASK_ASYNC;
	}else{
		taskFn = next;
		type = TASK_SYNC;
	}

	return this._add(taskFn, type);

};

/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn 每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {
	return this._add(taskFn, TASK_ASYNC);
};

/**
 * 添加一个同步任务，可在上一个任务完成执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then = function (callback) {

	var task = function(next){
		callback();
		next()
	};
	var type = TASK_SYNC;

	return this._add(task, type);

};

/**
 * 开始执行任务
 * @param interval 异步定时任务执行的间隔
 */
Animation.prototype.start = function (interval) {
	//动画状态为开始的话，则直接返回
	if(this.state===STATE_START) return;

	//如果任务链没有的话，则直接返回
	if(!this.taskQueue) return;

	//设置帧时间
	this.interval = interval;

	//开始任务
	this._runTask();

	return this;


};

/**
 * 添加一个同步任务，该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果，可定义重复的次数。
 * @param times 重复次数
 */
Animation.prototype.repeat = function (times) {
	var _this = this;
	var task = function () {
		if(typeof times==="undefined"){	//无限重复
			//无限回退到上一个任务
			_this.index--;
			_this._runTask();
			return;
		}

		if(times){		//若有限定重复次数
			times--;
			//回到上一个任务中
			_this.index--;
			_this._runTask();
		}else{			//达到重复次数，则到下一个任务中去

			var task = _this.taskQueue[_this.index];
			_this._next(task);
		}

	};

	var type = TASK_SYNC;

	return this._add(task, type);


};

/**
 * 添加一个同步任务，该任务就是无线循环上一次任务
 */
Animation.prototype.repeatForever = function () {
	return this.repeat();
};

/**
 * 设置当前任务结束后下一个任务开始前的等待时间
 * @param time 等待的时长
 */
Animation.prototype.wait = function (time) {
	if(this.taskQueue && this.taskQueue.length>0){
		this.taskQueue[this.taskQueue.length - 1].wait = time;
	}
	return this;
};

/**
 * 暂停当前执行的异步定时任务
 */
Animation.prototype.pause = function () {
	if (this.state === STATE_START) {
		this.state = STATE_STOP;
		this.timeline.stop();
		return this;
	}
	return this;
};

/**
 * 重新开始执行当前异步定时任务
 */
Animation.prototype.restart = function () {
	if (this.state === STATE_STOP) {
		this.state = STATE_START;
		this.timeline.restart();
		return this;
	}
	return this;
};

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
	if (this.state !== STATE_INITIAL) {
		this.state = STATE_INITIAL;
		this.taskQueue = null;
		this.timeline.stop();
		this.timeline = null;
		return this;
	}
	return this;
};

/**
 * 添加一个任务到任务队列中
 * @param taskFn 任务方法
 * @param type 任务类型
 * @returns {Animation}
 * @private
 */
Animation.prototype._add = function (taskFn, type) {

	//添加任务
	this.taskQueue.push({
		taskFn:taskFn,
		type:type
	});

	return this;

};

/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function () {

	//如果任务状态为开始或者任务链没有的话，则直接返回
	if(!this.taskQueue || this.state!==STATE_START) return;

	//如果任务链接执行完毕则释放资源
	if(this.index===this.taskQueue.length-1){
		this.dispose();
		return;
	}

	//获取特定任务
	var taskFn = this.taskQueue[this.index];

	if(taskFn.type===TASK_SYNC){	//同步任务
		this._syncTask(taskFn);
	}else if(taskFn.type===TASK_ASYNC){	//异步任务
		this._asyncTask(taskFn);
	}

	return this;

};

/**
 * 同步任务
 * @param task 执行任务的函数
 * @private
 */
Animation.prototype._syncTask = function (task) {
	var _this = this;

	var next = function () {
		//回调函数
		_this._next(task);
	};

	//当前任务链接的任务
	var task = task.taskFn;

	//执行当前任务，并将下一个任务，作为回调
	task(next);

};

/**
 * 异步任务
 * @param task 执行异步的函数
 * @private
 */
Animation.prototype._asyncTask = function (task) {

	var _this = this;

	//创建异步帧动画事件
	var onenterFrame = function (time) {

		var task = task.taskFn;
		//当前任务执行完之后的回调函数
		var next = function () {
			//停止执行当前异步任务
			_this.timeline.stop();
			//执行下一个任务
			_this._next(task);

		};
		//执行当前任务
		task(next, time);
	};

	//创建当前的帧动画的函数
	this.timeline.onenterframe = onenterFrame;
	this.timeline.start(this.interval);

};

/**
 * 切换到下一个任务，如果当前任务需要等待，则延时执行
 * @param task 下一个任务
 * @private
 */
Animation.prototype._next = function (task) {

	var me = this;
	this.index++;
	task.wait ? setTimeout(function () {
		me._runTask();
	}, task.wait) : this._runTask();

};



