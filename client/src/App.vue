<template>
  <div class="container">
    <SignPage :isLogin='isLogin' v-on:changeToLogin='login' v-if='!isLogin'></SignPage>
    
    <MainPage v-on:changeToLogout='logout' :tasks='tasks' v-else> </MainPage>
  </div>
</template>


<script>
import axios from "axios";
import MainPage from './components/MainPage'
import SignPage from './components/SignPage'

export default {
  components: {
    MainPage, SignPage
  },
  data() {
    return {
      tasks: [],
      form: "login",
      isLogin: false || localStorage.getItem("access_token"),
      input: {
        email_login: "",
        password_login: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      }
    };
  },
  methods: {
    login(value){
      this.isLogin = value // change to true
    },
    logout(value){
      this.isLogin = value // change to false
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://localhost:3000/tasks"
    })
      .then(tasks => {
        console.log(tasks);
        tasks.data.forEach(tasks => {
          this.tasks.push(tasks);
        });
      })
      .catch(err => console.error(err));
  }
};
</script>

<style scoped>
/* .container {
  background-color: red
} */
</style>