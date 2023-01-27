import { createApp } from 'vue'
import App from './App.vue'
import ImageKit from "../../../src/index"

createApp(App).use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
  authenticationEndpoint: process.env.VUE_APP_AUTHENTICATION_ENDPOINT
}).mount('#app')
