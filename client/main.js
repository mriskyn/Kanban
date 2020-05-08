

Vue.component('login', {
    template: `
    <div class='login'>
    <form @submit.prevent="login" v-if="$parent.form === 'login'">
        <label>Email</label>
        <input type="text" v-model="input.email_login"> <br>
        <label>Password</label>
        <input type="password" v-model="input.password_login"> <br>
    
        <input type="submit"> <button type="button" @click="showRegister">Register</button>
    </form>
    </div>`,
    data() {
        return {
            input: {
                email_login: '',
                password_login: ''
            }
        }
    },
    methods: {
        showRegister() {
            this.$parent.form = 'register'
        }
    }
})

Vue.component('register', {
    template: `
    <form @submit.prevent="register" v-else>
        <label>First Name</label>
        <input type="text" v-model="input.first_name"> <br>
        <label>Last Name</label>
        <input type="text" v-model="input.last_name"> <br>
        <label>Email</label>
        <input type="text" v-model="input.email"> <br>
        <label>Password</label>
        <input type="password" v-model="input.password"> <br>

        <input type="submit">
    </form>`,
    data(){
        return {
            input: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        register(){
            const { first_name, last_name, email, password } = this.input;
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/register',
                data: { first_name, last_name, email, password }
            })
                .then(user => {
                    console.log(user)
                    this.input.email = '';
                    this.input.password = '';
                    this.input.first_name = '';
                    this.input.last_name = '';
                    this.form = 'login'
                })
                .catch(err => console.error(err))
        }
    }
})

new Vue({
    el: '.container',
    data: {
        tasks: [],
        form: 'login',
        isLogin: false || localStorage.getItem('access_token'),
        categories: ['backlog', 'todo', 'done', 'completed'],
        inputTask: {
            backlog: '',
            todo: '',
            done: '',
            completed: ''
        },
        input: {
            email_login: '',
            password_login: '',
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        }
    },

    methods: {
        deleteTask(id) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/tasks/${id}`
            })
                .then(task => {
                    this.tasks.forEach((task, i) => {
                        if (task.id === id) {
                            this.tasks.splice(i, 1);
                        }
                    });
                })
                .catch(err => console.error(err))
        },
        addTask(category, id) {
            axios.post('http://localhost:3000/tasks', {
                title: this.inputTask[category], category
            })
                .then(task => {
                    this.tasks.push({
                        id,
                        title: this.inputTask[category],
                        category: category
                    });
                })
                .catch(err => console.error(err))
            this.inputTask[category] = '';
        },
        login() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.input.email_login,
                    password: this.input.password_login
                }
            })
                .then(user => {
                    this.input.email_login = '';
                    this.input.password_login = '';
                    localStorage.setItem('access_token', user.data.access_token);
                    this.isLogin = true;
                })
                .catch(err => console.error(err))
        },
        register() {
            const { first_name, last_name, email, password } = this.input;
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/register',
                data: { first_name, last_name, email, password }
            })
                .then(user => {
                    console.log(user)
                    this.input.email = '';
                    this.input.password = '';
                    this.input.first_name = '';
                    this.input.last_name = '';
                    this.form = 'login'
                })
                .catch(err => console.error(err))
        },
        showRegister() {
            this.form = 'register'
        },
        logout() {
            localStorage.removeItem('access_token');
            this.isLogin = false;
        }
    },
    created() {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/tasks'
        })
            .then(tasks => {
                console.log(tasks)
                tasks.data.forEach(tasks => {
                    this.tasks.push(tasks)
                })
            })
            .catch(err => console.error(err))
    }
})

