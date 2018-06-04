//为jq添加插件
$.fn.extend({
    waterfall: function () {
        /*插件中封装的方法，一般跟插件一致，方便使用 
        获取容器的宽度 子元素的宽度
         每一行放的元素个数 计算间距*/
        //  定义$_this变量方便观察
        var $_this = this;
        var totalWidth = $_this.width();
        var itemWidth = $_this.children(".item").width();
        //每一行的个数
        var cloNum = Math.floor(totalWidth / itemWidth);
        //间距（总宽度-个数*子元素宽度）/（个数-1）
        var margin = (totalWidth - itemWidth * cloNum) / (cloNum - 1);
        /*
    计算每一个元素的top值和left值
    1.准备一个数组，数组里元素的个数跟每一行的个数相同 里面为默认值（10或则margin）
    2.循环我们的所有.item子元素 获取子元素的高度 通过我们在上步中定义的数组 获取最小的值
    根据获取的最小值的索引值计算top以及left
    3.修改步骤1中定义的数组对应的索引值即可
    */
        var heightArr = [];
        //循环为高度的数组 赋值 初始化 
        for (var i = 0; i < cloNum; i++) {
            heightArr[i] = margin;
        }
        //jq中循环数组的方法
        $_this.children(".item").each(function (index, element) {
            //获取当前子元素的高度
            var currentHeight = $(element).height();
            //计算该元素放在哪个位置上
            var minIndex = 0;
            var minHeight = heightArr[minIndex];
            for (var i = 0; i < heightArr.length; i++) {
                if (heightArr[i] < minHeight) {
                    minHeight = heightArr[i];
                    minIndex = i;
                }
            }
            //循环完毕 最小的高度和最小的索引值获取到
            //设置给当前的循环的子元素即可 高度为计算出来的最小高度 左间距为宽度*索引+索引*间距
            $(element).css({
                top: minHeight,
                left: minIndex * itemWidth + minIndex * margin
            })
            //修改minIndex 对应的值即可
            minHeight += currentHeight;
            minHeight += margin;
            heightArr[minIndex] = minHeight;
        });
        //步骤3：修改父盒子的盖度即可
        /*获取高度数组中的最大值
        修改父盒子的高度为计算出来的最大值即可*/
        var maxHeight = heightArr[0];
        for (var i = 0; i < heightArr.length; i++) {
            if (heightArr[i] > maxHeight) {
                maxHeight = heightArr[i];
            }
        }
        //循环完毕找到高度为最大值
        $_this.height(maxHeight);

    }
})