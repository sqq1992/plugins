/**
 * 标签页的切换
 */
;
(function ($) {

    var Tab = function (element) {
        this.element = element;

    };

    //激活当前的某个选项卡
    Tab.prototype.show = function () {
        var $this = this.element;
        var ulNode = $this.closest("ul");   //当前点击按钮最近的父元素ul节点
        var selector = $this.data("target"); //当前选择的选项卡的目标对应的标签

        if(!selector){  //如果data-target不存在，则从href那里取目标值
            selector = $this.attr("href");
        }

        //当前点击选择按钮的父元素为激活的话，则直接返回
        if($this.parent("li").hasClass("active")) return;

        var e = $.Event('show.bs.tab');
        $this.trigger(e);

        //如果自定义回调里阻止默认事件，则直接返回
        if(e.isDefaultPrevented()) return;

        var target = $(selector);   //当前激活的标签

        //点击面板的切换激活状态
        this.active($this.parent("li"), ulNode);
        //当前显示的标签板
        this.active(target, target.parent(), function () {
            var e = $.Event("shown.bs.tab");
            $this.trigger(e);
        });

    };

    /**
     * 面板的隐藏与显示
     * @param activeElement 当前点击的节点，
     * @param elementParent 当前activeElement的父节点
     * @param callBack  当前的回调函数
     */
    Tab.prototype.active = function (activeElement,elementParent,callBack) {

        var $activeElement = elementParent.find(">.active");    //当前激活的节点

        $activeElement.removeClass("active");
        activeElement.addClass("active");


        callBack && callBack();
    };


    $.fn.tab = function (option) {

        return this.each(function () {
            var $this = $(this);
            var data = $this.data("bs.tab");
            //如果未实例化插件，则实列化插件
            if(!data) $this.data("bs.tab",data = new Tab($this));

            //如果传入的参数为字符串，则直接调用插件实列的某个方法
            if(typeof option==="string") data[option]();

        });

    };

    //事件委托的入口
    $(document).on("click..bs.tab.data-api", '[data-toggle="tab"]', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

})(jQuery);