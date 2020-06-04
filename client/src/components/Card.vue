<template>
  <div>
    {{ category }}
    <div
      class="item"
      v-for="task in tasks.filter(task => task.category == category)"
      :key="task.id"
    >
      <Item
        :task="task"
        :tasks="tasks"
        :categories="categories"
        @afterDelete="afterDelete"
        @afterUpdate="afterUpdate"
        @showError="showError"
      />
    </div>
    <form @submit.prevent="addTask(category)">
      <input type="text" class="add_task" v-model="inputTask[category]" />
      <input type="submit" class="submit_task" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item.vue";

export default {
  components: {
    Item
  },
  props: ["category", "categories"],
  data() {
    return {
      tasks: [],
      //   categories: ["backlog", "todo", "done", "completed"],
      //   errorMsg: '',
      editedTask: {},
      inputTask: {
        backlog: "",
        todo: "",
        done: "",
        completed: ""
      }
    };
  },
  methods: {
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
      })
        .then(res => {
          const newTask = res.data[0];
          this.tasks.push(newTask);
        })
        .catch(err => {
          if (this.inputTask[category] === "") {
            this.$emit("showError", `Title in ${category} is Empty!`);
          }
          console.error(err);
        });
      this.inputTask[category] = "";
    },
    logout() {
      localStorage.removeItem("access_token");
      this.$emit("changeToLogout", false);
    },
    afterDelete(newTasks) {
      this.tasks = newTasks;
    },
    afterUpdate(newTask) {
      this.tasks = newTask;
    },
    showError(newError) {
      this.$emit("showError", newError);
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://localhost:3000/tasks"
    })
      .then(res => {
        res.data.forEach(task => {
          this.tasks.push(task);
        });
      })
      .catch(err => {
        this.$emit("showError", "ERROR DATABASE!");
        console.error(err);
      });
  }
};
</script>

<style>
</style>