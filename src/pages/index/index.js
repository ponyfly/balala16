require('./index.css')
import Vue from 'vue'

const vm = new Vue({
  el: "#app",
  data: {
    msg: 'hella',
    isShowPlayIcon: true
  },
  methods: {
    playVideo() {
      this.isShowPlayIcon = false
      this.$refs.BalalaVideo.play()
    }
  }
})





// if (module.hot) {
//    module.hot.accept()
// }
