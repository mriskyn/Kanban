<template>
  <header>
    <div></div>
    <nav>KANBAN</nav>
    <button type="button" @click="logout">Logout</button>
  </header>
</template>

<script>
export default {
  methods: {
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
</style>