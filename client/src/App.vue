<template>
  <div class="container">
    <SignPage :isLogin="isLogin" v-on:changeToLogin="login" v-if="!isLogin"></SignPage>

    <MainPage v-on:changeToLogout="logout" v-else></MainPage>
  </div>
</template>


<script>
import axios from "axios";
import MainPage from "./components/MainPage";
import SignPage from "./components/SignPage";

export default {
  components: {
    MainPage,
    SignPage
  },
  data() {
    return {
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
    login(value) {
      this.isLogin = value; // change to true
    },
    logout(value) {
      this.isLogin = value; // change to false
    }
  }
};
</script>