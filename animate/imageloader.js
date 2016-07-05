
'use strict';


/**
 * 异步加载图片的函数
 * @param images	传入的图片数组
 * @param callback	回调函数
 * @param timeout	超时时间
 */
function loadImag(images,callback,timeout){

	//图片数组
	var count = 0;
	//图片全部成功加载
	var success = true;
	//图片是否超过时间加载
	var isTimeout = false;
	//超时id
	var timeoutId = 0;

	//遍历图片数组
	for(var k in images){
		if(!images.hasOwnProperty(k)) continue;		//如果图片数组是它的prototype属性，直接过滤


		var item = images[k];

		//如果图片数组为正确的字符串格式, 创建item的数据格式为{src:***}
		if(typeof item==="string"){
			item = {
				src:item
			}
		}

		//如果图片格式的字段不存在，则过滤
		if(!item || !item.src) continue;

		//图片数量计时器+1
		count++;

		//创建img对象
		item.img = new Image();

		//加载图片
		doLoad(item);

	}

	if(!count){		//图片数组为0，直接回调
		callback(success)
	}else if(timeout){	//如果超时时间存在，则执行超时函数
		timeoutId = setTimeout(onTimeout,timeout);
	}


	/**
	 * 图片正在加载
	 * @param item	传入的item对象
	 */
	function doLoad(item){

		var img = item.img;

		//图片成功加载
		img.onload = function () {
			success = success && true;

			//图片加载完
			done();
		};

		//图片失败加载
		img.onerror = function(){
			success = false;

			//图片加载完
			done();
		};

		//加载图片
		img.src = item.src;

		/**
		 * 图片加载后完的回调，不论成功与否
		 */
		function done(){
			img.onload = img.onerror = null;

			try{
				img = null;	//清楚img对象
			}catch(e){

			}

			//图片加载完毕并且图片没超时加载
			if(!--count && !isTimeout){
				clearTimeout(timeoutId);	//清楚超时函数
				callback(success);	//执行回调函数
			}
		}


	}

	//超时函数
	function onTimeout(){
		isTimeout = true;
		callback(false);
	}


}


