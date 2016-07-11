/**
 * 下拉菜单的显示与隐藏的插件
 */
;
(function ($) {

    //当前点击的元素
    var activeNode = null;

    var Dropdown = function (element,options) {
        this.element = element;
        this.options = options;
        this.isShown = false;
    };

    //显示
    Dropdown.prototype.show = function () {
        if(this.isShown) return ;
        this.isShown = true;

        //显示的回调事件
        var e = $.Event("show.dropdown");
        this.element.trigger(e);

        //当前激活按钮取消激活
        this.element
            .show()
            .on("click.dismiss.dropdown",'[data-dismiss="dropdown"]', $.proxy(this.hide,this)); //绑定取消弹窗按钮

    };

    //隐藏
    Dropdown.prototype.hide = function () {
        if(!this.isShown) return;
        this.isShown = false;

        //显示的回调事件
        activeNode.removeClass("active");
        var e = $.Event("hide.dropdown");
        this.element.trigger(e);

    };


    Dropdown.DEFAULTS = {
        show:true   //点击会显示下拉框
    };

    /**
     * 插件的实列入口
     * @param options   传入的配置参数
     * @returns {*}
     */
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this);
            var options = $.extend({}, Dropdown.DEFAULTS, typeof option === "object" && option);

            var data = $this.data("bs.dropdown");
            if(!data) $this.data("bs.dropdown", data = new Dropdown($this, options));

            if(typeof option==="string"){   //传入普通字符串对插件进行引用
                data[option]();
            }else if(options.show){         //传入配置参数对插件进行调节
                data.show();
            }

        });
    };

    $(document).on('click.bs.dropdown.data-api', '[data-toggle="dropdown"]', function (e) {
        var $this = $(this);
        activeNode = $this;
        var target = $($this.attr("data-target"));  //获取目标节点
        var option = target.data();                //获取配置参数

        //阻止默认事件
        e.preventDefault();

        //如果当前的节点是激活状态，则直接返回,否则增加active，且插件实列化
        if($this.hasClass("active")){
            return;
        }else{
            $this.addClass("active");
        }

        //实列化插件
        target.dropdown(option);

    });

})(jQuery);