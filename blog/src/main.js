import './static/style/index.css'
import app from './app.vue'
import vue from 'vue'   
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import { Button, Input, Upload,MessageBox } from 'element-ui';
import "./static/icon/iconfont.css";
vue.directive('highlight',function (el) {
  // console.log(123123);
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
vue.use(Button)
vue.use(Input)
vue.use(Upload)
vue.prototype.$confirm = MessageBox.confirm;
import router from './router/index.js'
import store from './store/index.js'
const root = document.createElement('div')
document.body.appendChild(root)
new vue({
  router,
  store,
  render: h => h(app)
}).$mount(root)