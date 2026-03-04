import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiPlugin from './plugins/api'
import tools from './plugins/tools'

const app = createApp(App)

app.use(router)
app.use(apiPlugin, {
  baseURL: 'https://donations.edu.netlor.fr',
  apiKey: import.meta.env.VITE_API_KEY
})
app.use(tools, { cutLength: 15 })

app.mount('#app')
