require('./index.css')
import Vue from 'vue'

let vm = new Vue({
  el: "#app",
  data: {
     msg: 'hella'
  }
})





if (module.hot) {
   module.hot.accept()
}
