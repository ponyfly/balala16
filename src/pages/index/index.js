require('./index.css')
import Vue from 'vue'
import BScroll from 'better-scroll'
import TOOLS from '../../util/util'

const vm = new Vue({
  el: "#app",
  data: {
    showPlayIcon: true,
    showFixBottom: true,
    showActiveClass: false,
    commentText: '',
    showTipPanel: false,
    tipContent: '',
    isLike: false,
    works:{},
    maskType: '',
    nextPageRecord: '',
    loadedAll: false,
    commentList: [],
    lastPostY:0,
    newUser: {}
  },
  methods: {
    _initStaticVal() {
      this.worksId = TOOLS._GetQueryString('id') || 80569
      this.shareUserId = TOOLS._GetQueryString('shareUserId') || ''
    },
    _getWorksShareDetail(){
      const config = {
        method: 'post',
        url: TOOLS.apis.worksShareDetail,
        data: JSON.stringify({
          worksId: this.worksId,
          shareUserId: this.shareUserId
        })
      }
      TOOLS._ajaxGetData(config)
        .then(({data}) => {
          this.works = data.works
        })
    },
    _getReplyList() {
      if(this.loadedAll){
        console.log('加载完了...')
        return
      }
      const config = {
        method: 'post',
        url: TOOLS.apis.replyList,
        data: JSON.stringify({
          worksId: this.worksId,
          pageSize: 20,
          pageRecord: this.nextPageRecord || ''
        })
      }
      TOOLS._ajaxGetData(config)
        .then(({data}) => {
          this.commentList = this.commentList.concat(data.list)
          this.nextPageRecord = data.nextPageRecord
          this.loadedAll = !(data.nextPageRecord).trim()
          this.$nextTick(() => {
            this._initScroll()
          })
        })
    },
    controlVideo() {
      if(this.showPlayIcon) {
        this.$refs.BalalaVideo.play()
      } else {
        this.$refs.BalalaVideo.pause()
      }
      this.showPlayIcon = !this.showPlayIcon
    },
    linkToAppStore(opt) {
      if(opt === 'get') {
        TOOLS._send1_1('Download_get')
      } else if(opt === 'like') {
        TOOLS._send1_1('Download_tan_zan')
      } else if(opt === 'comment') {
        TOOLS._send1_1('Download_tan_ping')
      }
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.j.tock&ckey=CK1385982821822'
    },
    closeFixBottom() {
      this.showFixBottom = false
    },
    changeHeight(isActive) {
      TOOLS._send1_1('Click_Comment')
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
      const newComment = {
        "content": this.commentText,
        "user": {
          "id": this.newUser.id,
          "nickName": "qingsongyan", //不同平台不同用户名 默认default
          "headUrl": "http://tvax2.sinaimg.cn/crop.5.0.1232.1232.1024/9b9e180dly8fjltddk5rnj20yi0y8dhq.jpg",
        },
        "replyTime": "刚刚"
      }
      this.commentList.unshift(newComment)
      this.$nextTick(()=> {
        this.scroll.refresh()
      })
      const config = {
        method: 'post',
        url: TOOLS.apis.sendReply,
        data: JSON.stringify({
          worksId: this.worksId,
          content: this.commentText,
          userInfo: {
            headUrl:'https://snapstatic2.j.cn/image/testsnap/180102/1813/9938e781c47b4643.jpg?imageView2/1/w/300/interlace/1/q/80/format/webp',
            id:this.newUser.id,
            nickName: 'qingsongyan'
          }
        })
      }
      TOOLS._ajaxGetData(config)
        .then(() => {
          this.commentText = ''
          this.changeHeight(false)
          this.maskType = 'comment'
        })
      TOOLS._send1_1('Click_Comment_finish')
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
      this.works.likeCount++
      this.isLike = true
      this.maskType = 'like'
      TOOLS._send1_1('Click_Like')
      this.attentionOn()
    },
    closeMask() {
      this.maskType = ''
    },
    _getNewestUserId() {
      let newUserId = localStorage.getItem('newUserId') || ''
      if(newUserId) {
        this.newUser.id = newUserId
        console.log('storage: ' + newUserId)
      } else {
        const config = {
          method: 'post',
          url: TOOLS.apis.getNewestUserId,
          data: JSON.stringify({})
        }
        TOOLS._ajaxGetData(config)
          .then(({data}) => {
            this.newUser.id = data.userId
            localStorage.setItem('newUserId', data.userId)
            console.log('ajax:' + data.userId)
          })
      }
    },
    goToUserCenter(index){
      if(index === -1) {
        TOOLS._send1_1('Click_nickname')
        window.location.href = '../user.html?userId=' + this.works.user.id
      } else{
        window.location.href = '../user.html?userId=' + this.commentList[index].id
      }
    },
    _initScroll(){
      if(!this.scroll) {
        this.scroll = new BScroll(this.$refs.ScrollContainer,{
          click: true,
          bounce: false,
          pullUpLoad: {
            threshold: 300,
          },
        })
        this.scroll.on('touchEnd', (pos) => {
          if(Math.abs(pos.y) - this.lastPostY > 300) {
            this.lastPostY = Math.abs(pos.y)
            this._getReplyList()
          }
        })
      } else {
        this.scroll.refresh()
      }
    },
    attentionOn() {
      const config = {
        method: 'post',
        url: TOOLS.apis.attentionOn,
        data: JSON.stringify({
          "objId": this.works.id,
          "type": 0,
          "userInfo": {
            "id": this.newUser.id,
            "nickName": "qingsongyan", //不同平台不同用户名 默认default
            "headUrl": "http://tvax2.sinaimg.cn/crop.5.0.1232.1232.1024/9b9e180dly8fjltddk5rnj20yi0y8dhq.jpg",
          },
        })
      }
      TOOLS._ajaxGetData(config)
        .then(({data}) => {
          console.log(data.bizStatus)
        })

    }
  },
  created() {
    this._initStaticVal()
    this._getNewestUserId()
    if(!this.worksId) return
    this._getWorksShareDetail()
    this._getReplyList()
  },
  mounted(){
    const ua = navigator.userAgent.toLowerCase()
    if(ua.indexOf('qq') > -1 || ua.indexOf('micromessenger') > -1) {
      this.$refs.BalalaVideo.addEventListener('x5videoexitfullscreen',()=>{
        this.$refs.BalalaVideo.pause()
        this.showPlayIcon = true
      })
    }
  }
})





if (module.hot) {
   module.hot.accept()
}
