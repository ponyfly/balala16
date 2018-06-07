import Vue from 'vue'
import icon1 from '../imgs/icon-1-1.png'
import icon2 from '../imgs/loading.gif'

Vue.component('balala-video', {
  template:`
<div class="video-a" :class="{'full-screen-videoa' : isFullScreen}">
    <video class="video"
          :class="{'full-screen': isFullScreen}"
          src="https://weappstatic1.j.cn/video/joke/180530/0204/b01b02fc636a11e8.mp4"
          poster="https://weappstatic1.j.cn/img/joke/180527/0353/69b04f14611e11e8.jpg?imageslim"
          x5-video-player-type="h5"
          x5-playsinline="true"
          playsinline
          webkit-playsinline="true"
          ref="BalalaVideo"
          preload
          @ended="videoEndHandler"
          @waiting="waitingHandler"
          @playing="playingHandler"
          @x5videoexitfullscreen="exitHandler"
          @x5videoenterfullscreen="enterHandler"
          @click="controlVideo">
    </video>
    <img class="play-icon" :src="icon.icon1" v-cloak v-show="showPlayIcon" @click="controlVideo">
    <img class="loading" :src="icon.icon2" v-cloak v-show="videoLoading">
</div>
`,
  props:['works','isFullScreen'],
  data(){
    return {
      showPlayIcon: true,
      videoLoading: false,
      icon: {
        icon1,
        icon2
      },
      isFirstClickVideo: true
    }
  },
  methods: {
    videoEndHandler() {
      this.showPlayIcon = true
      this.videoLoading = false
    },
    waitingHandler() {
      this.videoLoading = true
    },
    playingHandler() {
      this.videoLoading = false
    },
    exitHandler() {
      this.showPlayIcon = true
      this.videoLoading = false
      this.updateIsFullScreen(false)
      this.$refs.BalalaVideo.pause()
    },
    enterHandler() {
      this.updateIsFullScreen(true)
    },
    controlVideo() {
      if(this.showPlayIcon) {
        if (this.isFirstClickVideo) {
          this.$root.postCommonStats()
          this.isFirstClickVideo = false
        }
        this.$refs.BalalaVideo.play()
      } else {
        this.$refs.BalalaVideo.pause()
      }
      this.showPlayIcon = !this.showPlayIcon
    },
    updateIsFullScreen(bool){
      this.$emit('isFullScreen', bool)
    }
  }
})