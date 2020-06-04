import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import App from './App.vue'

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// Vue.use(BootstrapVue);
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '172260467005-fh9o96g78cjq092qnbca32hii2i43286.apps.googleusercontent.com'
}

// Vue.use(GAuth, gauthOption)

new Vue({
    el: '#app',
    render: h => h(App)
}).$mount('#app')