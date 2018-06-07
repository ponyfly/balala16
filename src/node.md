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
需求：可以小窗播放，同时点击右下角全屏按钮可以全屏播放，再次点击返回按钮可以返回小窗
实际开发：
+ `<video>`是视频的容器，初始要给`<video>`一个宽高，video的宽高并能使实际的视频撑满整个容器，给`<video>`一个黑色背景，实际视频的播放区域是撑满最短边，另一边自适应，其余部分为背景色
+ 在android自带浏览器中可以在容器内播放，在ios的safari中默认会全屏播放，通过添加`webkit-playsinline="true" playsinline`同样也可以实现在容器中播放。假想通过点击全屏按钮实现全屏播放，在ios的safari中通过js设置`playsinline=false`并不能实现全屏播放，在android中，因为各厂家浏览器对video有着各自的解析，大部分是通过video标签实现的，但是oppo，vivo很多机型是通过内置播放器去播放视频的，所以在android自带浏览器实现内联播放、全屏播放的切换也很困难，而且在ios上和android上的表现不一致也不是饿哦们想要的，所以最终确定在自带浏览器上使用内联播放
+ 在微信和qq平台上播放视频时，发现ios的`webkit-playsinline="true" playsinline`同样可以内联播放，同样也不能通过js设置为全屏播放。在android上是小窗播放，但是video会出现系统自带的控制条，点击系统自带的全屏按钮，视频会全屏播放，但是播放完会显示
+ 给`<video></video>`标签和播放按钮同时添加一个控制播放的事件，通过判断播放按钮的显示与隐藏来进一步判断下一次点击是播放还是暂停
```
controlVideo() {
      if(this.showPlayIcon) {
        this.$refs.BalalaVideo.play()
      } else {
        this.$refs.BalalaVideo.pause()
      }
      this.showPlayIcon = !this.showPlayIcon
    },
```
+ 在ios上加`preload`并不能如预期提前预加载视频，所以需要添加一个loading
在waiting的时候显示loading,在playing的时候隐藏loading,在播放结束后也应该隐藏loading，安卓退出全屏播放后也应该隐藏loading
```
//html
    <video  @waiting="waitingHandler" @playing="playingHandler" @x5videoexitfullscreen="exitHandler" @x5videoenterfullscreen="enterHandler"></video>
//js
    waitingHandler() {
     this.videoLoading = true
    },
    playingHandler() {
      this.videoLoading = false
    },
```
+ 前提：已经给video预设了宽高，ios系统safari浏览器打开上点击播放默认全屏播放，通过添加`webkit-playsinline="true" playsinline`可以实现内联播放（在已设定好的宽高范围内播放），在微信和qq上，通过添加`x5-playsinline="true"`可以实现内联播放，但是点击右下角全屏按钮时，通过js去掉``playsinline和webkit-playsinline="true"`属性，发现并不能进入全屏，因此最终敲定在ios上内联播放+6+
+ 前提：已经给video预设了宽高；android系统中，因为`playsinline和webkit-playsinline="true"`并不对安卓生效，但是已经预设了宽高，所以自带浏览器可以内联播放，也可以全屏播放，但是在微信和qq中，因为点击播放会默认全屏播放，并且播放完后会出现广告视频，通过添加`x5-playsinline="true"`同样可以实现内联播放，但是期望全屏播放，可以添加`x5-video-player-type="h5"`开启同层播放，开启同层播放后，可以通过js动态改变视频宽高，并在视频上添加想要的东西
6. 移动端添加全屏遮罩后，在遮罩上滑动，底部的页面会跟随滑动
给遮罩添加`touchmove`事件，并阻止默认行为，`<div class="mask" @touchmove.prevent></div>`
7. vue filters过滤器使用方法
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


