import React, { Component } from 'react';
import Taskitem from './taskitem'
import '../App.css';


class Tasklist extends Component {
    constructor(){
        super()
        this.state = {
            filterName : '',   
            filterStatus : -1 //all: -1 , active: 1 , unactive: 0     
        }
    }
    onChangeStatus = (taskID,status)=>{
        this.props.onChangeStatus(taskID,status)
        
    }
    onDeleteTask=(id)=>{
        this.props.onDeleteTask(id)
        
    }
    onUpdate = (id)=>{
        this.props.onUpdate(id)
    }
    onChange = async (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        await this.setState({
            [name]:value
        })
        this.props.onFilter(this.state.filterName,this.state.filterStatus)
    }
    render() {
        var {tasks} = this.props;
        if(this.props.sort.by==='status'){
            if(this.props.sort.value===1){
                tasks=tasks.filter((task)=>{
                    return task.status===true
                })
            }else{
                tasks=tasks.filter((task)=>{
                    return task.status===false
                })
            }
        }else if(this.props.sort.by==='name'){
            if(this.props.sort.value===-1){
                tasks = tasks.sort((a,b)=>{
                    if(b.name>a.name){return 1}
                    else if(b.name<a.name){return -1}
                    else{return 0}
                })
            }else if(this.props.sort.value===1){
                tasks = tasks.sort((a,b)=>{
                    if(a.name>b.name){return 1}
                    else if(a.name<b.name){return -1}
                    else{return 0}
                })
            }
        }
        let elementTasks = tasks.map((task,index)=>{
            return < Taskitem 
                        index={index} 
                        key={task.id} 
                        task={task} 
                        onChangeStatus={this.onChangeStatus}
                        onDeleteTask = {this.onDeleteTask}
                        onUpdate = {this.onUpdate}
                        />
        })
        return (

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th class="text-center">STT</th>
                        <th class="text-center">Tên</th>
                        <th class="text-center">Trạng Thái</th>
                        <th class="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" 
                            class="form-control" 
                            name='filterName'
                            // value={filterName}
                            onChange={this.onChange}/>
                        </td>
                        <td>
                            <select 
                            class="form-control"
                            name='filterStatus'
                            // value={filterStatus}
                            onChange={this.onChange}>
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elementTasks}
                    
                </tbody>
            </table>

        )
    }
}

export default Tasklist;
