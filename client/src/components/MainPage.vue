<template>
  <div class="main-page">
    <header>
      <div></div>
      <nav>KANBAN</nav>
      <button type="button" @click="logout">Logout</button>
    </header>
    <div class="alert" role="alert" v-show="errorMsg !== ''">{{ errorMsg }}</div>
    <!-- <NavBar /> -->
    <div class="content">
      <Card
        class="card"
        v-for="(category, indexCategory) in categories"
        :key="indexCategory"
        :category="category"
        :categories="categories"
        @showError="showError"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item.vue";
import NavBar from "./Header.vue";
import Card from "./Card.vue";

export default {
  components: {
    Item,
    NavBar,
    Card
  },
  data() {
    return {
      categories: ["backlog", "todo", "done", "completed"],
      errorMsg: ""
    };
  },
  methods: {
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
      this.errorMsg = newError;
      setTimeout(() => {
        this.errorMsg = "";
      }, 5000);
    }
  }
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  box-sizing: border-box;
  background-color: #24252a;
}

header > nav,
header > button {
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header > button {
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

header > button:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

.alert {
  text-align: center;
  border: 1px solid red;
  /* margin-top: 3px; */
  margin: 3px 200px 0 200px;
  border-radius: 5px;
  background-color: rgb(248, 126, 126);
  padding: 5px 0;
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