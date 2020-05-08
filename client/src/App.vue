<template>
    <div class="container">
      <div class="login-page" v-if="!isLogin">
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
      </div>

      <div class="main-page" v-else>
        <div class="card" v-for="(category, indexCategory) in categories" :key="indexCategory">
          {{ category }}
          <div
            class="item"
            v-for="task in tasks.filter(task => task.category == category)"
            :key="task.id"
          >
            {{ task.title }}
            <button @click="deleteTask(task.id)">DELETE</button>
          </div>
          <form v-on:submit.prevent="addTask(category, task.id)">
            <input type="text" class="add_task" v-model="inputTask[category]" />
            <input type="submit" class="submit_task" />
          </form>
        </div>
        <button type="button" @click="logout">Logout</button>
      </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: [],
      form: "login",
      isLogin: false || localStorage.getItem("access_token"),
      categories: ["backlog", "todo", "done", "completed"],
      inputTask: {
        backlog: "",
        todo: "",
        done: "",
        completed: ""
      },
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
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/tasks/${id}`
      })
        .then(task => {
          this.tasks.forEach((task, i) => {
            if (task.id === id) {
              this.tasks.splice(i, 1);
            }
          });
        })
        .catch(err => console.error(err));
    },
    addTask(category, id) {
      axios
        .post("http://localhost:3000/tasks", {
          title: this.inputTask[category],
          category
        })
        .then(task => {
          this.tasks.push({
            id,
            title: this.inputTask[category],
            category: category
          });
        })
        .catch(err => console.error(err));
      this.inputTask[category] = "";
    },
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
          this.isLogin = true;
        })
        .catch(err => console.error(err));
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
        .catch(err => console.error(err));
    },
    showRegister() {
      this.form = "register";
    },
    logout() {
      localStorage.removeItem("access_token");
      this.isLogin = false;
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
* {
  background-color: steelblue;
}

.main-page {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  font-family: Arial, Helvetica, sans-serif;
}

.card {
  background: lightgrey;
  padding: 1em;
  flex-basis: 20%;
  border-radius: 5px;
  font-weight: bold;
}

.item {
  display: grid;
  border-radius: 5px;
  background: white;
  margin: 5px 0;
  margin-bottom: 10px;
  padding: 7px;
  font-weight: normal;
}
</style>