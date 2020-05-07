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