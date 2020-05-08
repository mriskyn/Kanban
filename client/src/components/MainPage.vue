<template>
  <div class="main-page">
      <header>
          <div></div>
          <nav>
              KANBAN
          </nav>
          <button type="button" @click="logout">Logout</button>
    </header>
    <div class="content">
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
        <form v-on:submit.prevent="addTask(category)">
          <input type="text" class="add_task" v-model="inputTask[category]" />
          <input type="submit" class="submit_task" />
        </form>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["tasks"],
  data() {
    return {
      categories: ["backlog", "todo", "done", "completed"],
      inputTask: {
        backlog: "",
        todo: "",
        done: "",
        completed: ""
      }
    };
  },
  methods: {
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(() => {
          this.tasks.forEach((task, i) => {
            if (task.id === id) {
              this.tasks.splice(i, 1);
            }
          });
        })
        .catch(err => console.error(err));
    },
    addTask(category) {
      axios({
        method: "POST",
        url: "http://localhost:3000/tasks",
        data: {
          title: this.inputTask[category],
          category
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(task => {
        console.log(task.data);
        this.tasks.push({
          id: task.data.id,
          title: task.data.title,
          category: task.data.category
        });
      });
      this.inputTask[category] = "";
    },
    logout() {
      localStorage.removeItem("access_token");
      this.$emit("changeToLogout", false);
    }
  }
};
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 10%;
    box-sizing: border-box;
    background-color: #24252A;
}

header > nav, header > button{
    font-weight: 500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
}

header > button {
    padding: 9px 25px;
    background-color: rgba(0,136,169,1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s 
}

header > button:hover{
    background-color: rgba(0, 136, 169, 0.8)
}
.content {
  padding: 10px;
  margin: 10px;
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