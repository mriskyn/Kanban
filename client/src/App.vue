<template>
  <div class="container">
    <!-- <div class="login-page" v-if="!isLogin">
      <form @submit.prevent="login" v-if="form === 'login'">
        <div class="login">
          <label>Email</label>
          <input type="text" v-model="input.email_login" />
          <br />
          <label>Password</label>
          <input type="password" v-model="input.password_login" />
          <br />

          <input type="submit" />
          <button type="button" @click="showRegister">Register</button>
        </div>
      </form>

      <form @submit.prevent="register" v-else>
        <div class="register">
          <label>First Name</label>
          <input type="text" v-model="input.first_name" />
          <br />
          <label>Last Name</label>
          <input type="text" v-model="input.last_name" />
          <br />
          <label>Email</label>
          <input type="text" v-model="input.email" />
          <br />
          <label>Password</label>
          <input type="password" v-model="input.password" />
          <br />

          <input type="submit" />
        </div>
      </form>
    </div> -->
    <SignPage :isLogin='isLogin' v-on:childToParent='login' v-if='!isLogin'></SignPage>
    
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
    // login() {
    //   axios({
    //     method: "POST",
    //     url: "http://localhost:3000/users/login",
    //     data: {
    //       email: this.input.email_login,
    //       password: this.input.password_login
    //     }
    //   })
    //     .then(user => {
    //       this.input.email_login = "";
    //       this.input.password_login = "";
    //       localStorage.setItem("access_token", user.data.access_token);
    //       this.isLogin = true;
    //     })
    //     .catch(err => console.error(err));
    // },
    // register() {
    //   const { first_name, last_name, email, password } = this.input;
    //   axios({
    //     method: "POST",
    //     url: "http://localhost:3000/users/register",
    //     data: { first_name, last_name, email, password }
    //   })
    //     .then(user => {
    //       console.log(user);
    //       this.input.email = "";
    //       this.input.password = "";
    //       this.input.first_name = "";
    //       this.input.last_name = "";
    //       this.form = "login";
    //     })
    //     .catch(err => console.error(err));
    // },
    // showRegister() {
    //   this.form = "register";
    // }
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

</style>