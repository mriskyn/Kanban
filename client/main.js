new Vue({
    el: '.container',
    data: {
        tasks: [],
        categories: ['backlog', 'todo', 'done', 'completed'],
        inputTask: {
            backlog: '',
            todo: '',
            done: '',
            completed: ''
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
                .catch(err => {
                    console.error(err);
                })
        },
        addTask(statusTaskInput, id) {
            axios.post('http://localhost:3000/tasks', {
                title: this.inputTask[statusTaskInput],
                category: statusTaskInput
            })
                .then(task => {
                    this.tasks.push({
                        id,
                        title: this.inputTask[statusTaskInput],
                        category: statusTaskInput
                    });
                })
                .catch(err => {
                    console.error(err);
                })
            this.inputTask[statusTaskInput] = '';
        }
    },
    created() {
        axios.get('http://localhost:3000/tasks')
            .then(tasks => {
                tasks.data.forEach(tasks => {
                    this.tasks.push(tasks)
                });
            })
            .catch(err => console.error(err))
    }
})