import React, { Component, forwardRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Taskform from './components/TaskForm';
import Control from './components/control';
import Tasklist from './components/tasklist';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEdit: null,
            filter: {
                name: '',
                status: -1,
            },
            keyword:'',
            sort:{
                by:'name',
                value: 1
            }
        }
    }
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks
            })
        }
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    generateID() {
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    }
    onToggleForm = () => {
        this.setState({
            isDisplayForm: true,
            taskEdit: null
        })
    }
    onExitTaskForm = () => {
        this.setState({
            isDisplayForm: false,
        })
    }
    onSubmit = async (data) => {
        if (data.id !== '') {
            let { tasks } = this.state
            let index = await this.findIndex(data.id, tasks)
            tasks[index] = data
            this.setState({
                tasks: tasks,
                isDisplayForm: false,
                taskEdit: null
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        } else {
            data.id = this.generateID();
            let { tasks, isDisplayForm } = this.state;
            tasks.push(data)
            this.setState({
                tasks: tasks,
                isDisplayForm: false
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }
    onClearTaskForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }
    onChangeStatus = (taskID, status) => {
        let { tasks } = this.state
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskID) {
                tasks[i].status = !status
            }
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    onDeleteTask = (id) => {
        let { tasks } = this.state
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1)
            }
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }
    findIndex(id, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return i
            }
        }
    }
    onUpdate = async (id) => {
        let { tasks } = this.state;
        let index = await this.findIndex(id, tasks)
        this.setState({
            taskEdit: tasks[index],
            isDisplayForm: true
        })
    }
    onFilter = async (name, status) => {
        let filterStatus = parseInt(status)
        await this.setState({
            filter: {
                name: name.toLowerCase(),
                status: filterStatus
            }
        })

    }
    onSearch=(keyword)=>{
        this.setState({
            keyword:keyword.toLowerCase()
        })
    }
    onSort = async (sort)=>{
        await this.setState({
            sort:{
                by: sort.by,
                value: sort.value
            }
        })
        console.log(this.state.sort)
    }
    render() {
        let { tasks, isDisplayForm, filter, keyword } = this.state;
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if(this.state.keyword){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(keyword) !== -1
            })
        }
        let elementDisplayForm = isDisplayForm === true ?
            < Taskform
                onSubmit={this.onSubmit}
                onExitTaskForm={this.onExitTaskForm}
                onClearTaskForm={this.onClearTaskForm}
                taskEdit={this.state.taskEdit}
            /> : '';
        return (
            <div class="container">
                <div class="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div class="row">
                    {elementDisplayForm}
                    <div className={this.state.isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" class="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>

                        < Control 
                        onSearch = {this.onSearch}
                        onSort = {this.onSort}/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                < Tasklist
                                    tasks={tasks}
                                    onChangeStatus={this.onChangeStatus}
                                    onDeleteTask={this.onDeleteTask}
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}
                                    sort={this.state.sort}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
