require('./index.css')
import Vue from 'vue'

const vm = new Vue({
  el: "#app",
  data: {
    showPlayIcon: true,
    showFixBottom: true,
    showActiveClass: false,
    commentText: '',
    showTipPanel: false,
    tipContent: ''
  },
  methods: {
    playVideo() {
      this.showPlayIcon = false
      this.$refs.BalalaVideo.play()
    },
    linkToAppStore() {
      window.location.href = ''
    },
    closeFixBottom() {
      this.showFixBottom = false
    },
    changeHeight(isActive) {
      this.showActiveClass = isActive
    },
    publishComment() {
      const commentLength = this.commentText.trim().length
      if(commentLength === 0) {
        this.controlTipPanel('请填入评论内容')
        return
      } else if(commentLength > 120) {
        this.controlTipPanel('不能超过120字')
        return
      }
      setTimeout(()=> {
        this.commentText = ''
        this.changeHeight(false)
      },600)
    },
    controlTipPanel(text) {
      this.tipContent = text
      this.showTipPanel = true
      setTimeout(() => {
        this.tipContent = ''
        this.showTipPanel = false
      },1000)
    }
  }
})





// if (module.hot) {
//    module.hot.accept()
// }
