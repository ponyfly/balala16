require('./index.css')
import Vue from 'vue'
import TOOLS from '../../util/util'

const vm = new Vue({
  el: "#app",
  data: {
    personalInfos:{}
  },
  methods: {
    _initStaticVal() {
      this.userId = TOOLS._GetQueryString('userId') || 7
    },
    _getPersonalNewsList() {
      const config = {
        method: 'post',
        url: TOOLS.apis.personalNewsList,
        data: JSON.stringify({
          listType:0,
          pageRecord: '',
          pageSize: 20,
          personalId: this.userId
        })
      }
      TOOLS._ajaxGetData(config)
        .then(({data}) => {
          this.personalInfos = data
        })
    }
  },
  created() {
    this._initStaticVal()
    this._getPersonalNewsList()
  }
})