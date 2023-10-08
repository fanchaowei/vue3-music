import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/scss/index.scss'
import { setupRouter } from '@/router'
import { setupDirective } from '@/directives'
import { setupPlugins } from '@/plugins'

const app = createApp(App)
setupRouter(app)
// 注册自定义指令
setupDirective(app)
// 初始化配置
setupPlugins(app)

app.mount('#app')
