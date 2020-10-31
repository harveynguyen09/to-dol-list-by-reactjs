import React, { Component } from 'react';

import '../App.css';


class Taskitem extends Component {
    onChangeStatus = ()=>{
        this.props.onChangeStatus(this.props.task.id,this.props.task.status)
       
    }
    onDeleteTask = ()=>{
        this.props.onDeleteTask(this.props.task.id)
    }
    onUpdate = ()=>{
        this.props.onUpdate(this.props.task.id)
    }
    render() {
        let {task,index} = this.props
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status===true?"label label-success":"label label-danger"} onClick={this.onChangeStatus}>
                        {task.status===true?"kích hoạt":"ẩn"}
                                                </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-danger" onClick = {this.onDeleteTask}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default Taskitem;
