<template>
  <div class="login-page">
    <div class="hero">
      <div class="form-box">
        <div class="button-box">
          <div id="btn"></div>
          <button class="toogle-btn" @click="form = 'login'">Login</button>
          <button class="toogle-btn" @click="form = 'register'">Register</button>
        </div>
        <div class="social-icons">
          <img src="https://i.imgur.com/uDrCiij.png" />
          <img src="https://i.imgur.com/hPMvYI3.png" />
          <img src="https://i.imgur.com/XArGSwe.png" />
        </div>
        <div class="error_box" v-show="errorMsg !== ''">
          {{ errorMsg }}
        </div>
        <form id="login" class="input-group" @submit.prevent="login" v-if="form === 'login'">
          <input type="text" class="input-field" placeholder="Email" v-model="input.email_login" />
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            v-model="input.password_login"
          />
          <button type="submit" class="submit-btn">Login</button>
        </form>

        <form id="register" class="input-group" @submit.prevent="register" v-else>
          <input
            type="text"
            class="input-field"
            placeholder="First Name"
            v-model="input.first_name"
          />
          <input type="text" class="input-field" placeholder="Last Name" v-model="input.last_name" />
          <input type="text" class="input-field" placeholder="Email" v-model="input.email" />
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            v-model="input.password"
          />
          <button type="submit" class="submit-btn">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["isLogin"],
  data() {
    return {
      input: {
        email_login: "",
        password_login: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      },
      form: "login",
      errorMsg: '',
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/users/login",
        data: {
          email: this.input.email_login,
          password: this.input.password_login
        }
      })
        .then(user => {
          this.input.email_login = "";
          this.input.password_login = "";
          localStorage.setItem("access_token", user.data.access_token);
          this.$emit("changeToLogin", true);
        })
        .catch(err => {
          if(this.input.email_login === '') {
            this.errorMsg += 'Email is Empty! ';
          }
          if(this.input.password_login === '') {
            this.errorMsg += 'Password is Empty! ';
          }
          setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          console.error(err);
        });
    },
    register() {
      const { first_name, last_name, email, password } = this.input;
      axios({
        method: "POST",
        url: "http://localhost:3000/users/register",
        data: { first_name, last_name, email, password }
      })
        .then(user => {
          console.log(user);
          this.input.email = "";
          this.input.password = "";
          this.input.first_name = "";
          this.input.last_name = "";
          this.form = "login";
        })
        .catch(err => {
          if(this.input.email === '') {
            this.errorMsg += 'Email is Empty! ';
          }
          if(this.input.password === '') {
            this.errorMsg += 'Password is Empty! ';
          }
          if(this.input.first_name === '') {
            this.errorMsg += 'First Name is Empty! ';
          }
          if(this.input.last_name === '') {
            this.errorMsg += 'Last Name is Empty! ';
          }
          setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          console.error(err);
        });
    },
    showRegister() {
      this.form = "register";
    }
  }
};
</script>

<style scoped>
.error_box {
  text-align: center;
  /* margin: 10px 0; */
  border: 1px solid red;
  padding: 5px 0;
  border-radius: 5px;
  background-color: rgb(248, 126, 126);
}

.hero {
  height: 100%;
  width: 100%;
  background-image: url("https://thumbs.dreamstime.com/b/minimalist-architect-designer-concept-table-desk-chair-kitchen-office-lamps-striped-wallpaper-background-blue-pa-118312651.jpg");
  background-position: center;
  background-size: cover;
  position: absolute;
}

.form-box {
  width: 380px;
  height: 480px;
  position: relative;
  margin: 6% auto;
  background: rgb(226, 226, 226);
  padding: 5px;
  overflow: hidden;
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 3px;
}
.button-box {
  width: 220px;
  margin: 35px auto;
  position: relative;
  box-shadow: 0 0 20px 9px bisque;
  border-radius: 30px;
}
.toogle-btn {
  padding: 10px 30px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
}
#btn {
  top: 0;
  left: 0;
  position: absolute;
  width: 110px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(2, 25, 168, 0.4500175070028011) 0%,
    rgba(24, 181, 233, 1) 52%,
    rgba(0, 212, 255, 1) 100%
  );
  border-radius: 50px;
  transition: 0.5s;
}

.social-icons {
  margin: 30px auto;
  text-align: center;
}

.social-icons img {
  width: 35px;
  margin: 0 12px;
  box-shadow: 0 0 20px 0 #7f7f7f3d;
  cursor: pointer;
  border-radius: 50%;
}

.input-group {
  top: 220px;
  position: absolute;
  width: 280px;
  transition: 0.5s;
}

.input-field {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #999;
  outline: none;
  background: transparent;
}

.submit-btn {
  widows: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: linear-gradient(
    90deg,
    rgba(2, 25, 168, 0.4500175070028011) 0%,
    rgba(24, 181, 233, 1) 52%,
    rgba(0, 212, 255, 1) 100%
  );
  border: 0;
  outline: none;
  border-radius: 30px;
}
.check-box {
  margin: 30px 3px 30px 0;
}
label {
  color: #777;
  font-size: 12px;
  bottom: 68px;
}

#login {
  left: 50px;
}
#register {
  left: 50px;
}
</style>