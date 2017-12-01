var canvas = window._canvas = new fabric.Canvas('c');
canvas.selection = false;

// Do some initializing stuff
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'red',
    cornerSize: 12,
    padding: 0
});
var text = new fabric.Text('Sample',{
    top: canvas.height/2,
    left: canvas.width/2,
    fill: '#000000'
});

canvas.add(text);
canvas.setActiveObject(text);

canvas.observe('object:scaling', function (e) {
    var obj = e.target;
    if(obj.getHeight() > obj.canvas.height || obj.getWidth() > obj.canvas.width){
        obj.setScaleY(obj.originalState.scaleY);
        obj.setScaleX(obj.originalState.scaleX);
    }
    obj.setCoords();
    if(obj.getBoundingRect().top - (obj.cornerSize / 2) < 0 ||
        obj.getBoundingRect().left -  (obj.cornerSize / 2) < 0) {
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + (obj.cornerSize / 2));
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + (obj.cornerSize / 2));
    }
    if(obj.getBoundingRect().top+obj.getBoundingRect().height + obj.cornerSize  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width + obj.cornerSize  > obj.canvas.width) {

        obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - obj.cornerSize / 2);
        obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - obj.cornerSize /2);
    }
});

canvas.observe('object:moving', function (e) {
    var obj = e.target;
    if(obj.getHeight() > obj.canvas.height || obj.getWidth() > obj.canvas.width){
        obj.setScaleY(obj.originalState.scaleY);
        obj.setScaleX(obj.originalState.scaleX);
    }
    obj.setCoords();
    if(obj.getBoundingRect().top - (obj.cornerSize / 2) < 0 ||
        obj.getBoundingRect().left -  (obj.cornerSize / 2) < 0) {
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + (obj.cornerSize / 2));
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + (obj.cornerSize / 2));
    }
    if(obj.getBoundingRect().top+obj.getBoundingRect().height + obj.cornerSize  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width + obj.cornerSize  > obj.canvas.width) {

        obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - obj.cornerSize / 2);
        obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - obj.cornerSize /2);
    }
});

document.getElementById("test").onclick = function () {

    text.rotate(90);
    canvas.renderAll();

};