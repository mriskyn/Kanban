<template>
  <div>
    <div v-if="!edit">
      <p>{{ task.title }}</p>
      <span>By {{ task.User.first_name }} {{ task.User.last_name}}</span>
      <br />
      <button @click="deleteTask(task.id)">DELETE</button>
      <button @click="edit = true">EDIT</button>
    </div>
    <div v-else>
      <form @submit.prevent="editTask(task.id)">
        <label>Title</label>
        <input type="text" v-model="title" />
        <label>Category</label>
        <br />
        <select v-model="category">
          <option v-for="(category, i) in categories" :key="i" :value="category">{{ category }}</option>
        </select>
        <br />
        <button type="submit">EDIT</button>
        <button type="button" @click="edit = false">BACK</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["task", "tasks", "categories"],
  data() {
    return {
      edit: false,
      title: this.task.title,
      category: this.task.category
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
          this.$emit("afterDelete", this.tasks);
        })
        .catch(err => {
          console.log("ITEM");
          this.$emit("showError", `AUTHORIZATION FAILED! CAN'T DELETE`);
          console.error(err);
        });
    },
    editTask(id) {
      const { title, category } = this;
      axios({
        method: "PUT",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: { title, category }
      })
        .then(res => {
          const newTask = res.data[[0]];
          this.tasks = this.tasks.map(task =>
            task.id === newTask.id ? newTask : task
          );
          this.$emit("afterUpdate", this.tasks);
        })
        .catch(err => {
          this.$emit("showError", `AUTHORIZATION FAILED! CAN'T EDIT`);
          console.error(err);
        });
      this.edit = false;
    }
  }
};
</script>

<style scoped>
span {
  font-size: 75%;
}

button {
  height: 20px;
  width: 40px;
  font-size: 50%;
}
</style>
