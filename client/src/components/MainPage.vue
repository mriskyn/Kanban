<template>
  <div class="main-page">
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
</template>

<script>
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
    logout() {
      localStorage.removeItem("access_token");
      this.$emit('changeToLogout', false)
    }
  }
};
</script>

<style scoped>
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