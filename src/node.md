## 巴啦啦着陆页工作总结，问题汇总
---

1. 使用webpack多页面构建项目
项目使用webpack4构建项目，构建项目过程中踩了很多坑，查看了网上很多大神的文章，最终构建了自己的项目骨架，虽然还有不足之处，但是暂且这样，往后有时间再继续优化。
附上webpack4多页面配置地址：[webpack4多页面配置](git@github.com:ponyfly/webpack4.git)内含使用dll构建项目的分支，在使用dll构建项目时，如果项目中使用了vue,要在`webpack.dll.config.js`和`webpack.prod.config.js`中同时配置`alias:{vue: 'vue/dist/vue.min.js'}`

2. 封装util常用函数
util模板地址：[util常用公共函数](https://github.com/ponyfly/webpack4/blob/master/src/util/util.js)
3. reset.min.css
[reset.min.css](https://github.com/ponyfly/webpack4/blob/master/src/common/reset.min.css)
4. html页面构建总结
在HTML页面书写过程中，把不同功能的部分分开几个div，同时在写样式时，也按照不同模块去书写样式，同时添加注释如：
```
//html
<div id="app">
    <div class="pages">
        <!--page1,头部部分-->
        <div class="page1"></div>
        <!--page2,主题部分-->
        <div class="page2"></div>
        <!--page3,底部部分-->
        <div class="page3"></div>
    </div>
    <!--底部固定部分-->
    <div class="fix-bottom"></div>
</div>
//css
/*common*/
#app{width:750px;height:100%;margin: 0 auto;overflow: hidden;position:relative}
#app .pages{width:100%;height:100%;position:relative}
/*page1*/
#app .pages page1{}
/*page2*/
#app .pages page2{}
/*page3*/
#app .pages page3{}
/*fix-bottom*/
#app. fix-bottom{}
```
5. 移动端h5视频播放总结（含微信，QQ视频播放填坑）
6. 移动端添加全屏遮罩后，在遮罩上滑动，底部的页面会跟随滑动
给遮罩添加`touchmove`事件，并阻止默认行为，`<div class="mask" @touchmove.prevent></div>`
7. vue自定义数据格式化
```
//js
new Vue({
    data: {},
    filters: {
        formatImg(imgSrc) {
            return (imgSrc.lastIndexOf('webp') > -1) ? imgSrc.match(/(.*)80\/format\/webp/)[1] + '60' : imgSrc
        }
    }
})
//html
<img class="poster" :src="item.worksPic.url | formatImg">
```


