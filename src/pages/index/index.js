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
    tipContent: '',
    isLike: false
  },
  methods: {
    controlVideo() {
      if(this.showPlayIcon) {
        this.$refs.BalalaVideo.play()
      } else {
        this.$refs.BalalaVideo.pause()
      }
      this.showPlayIcon = !this.showPlayIcon
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
    },
    videoEndHandler() {
      this.showPlayIcon = true
    },
    showLike() {
      this.isLike = true
    }
  }
})





if (module.hot) {
   module.hot.accept()
}
