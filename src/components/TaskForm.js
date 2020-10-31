import React, { Component } from 'react';
import '../App.css';


class Taskform extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            status: false,
        }
    }
    componentWillMount() {
        if (this.props.taskEdit) {
            this.setState({
                id: this.props.taskEdit.id,
                name: this.props.taskEdit.name,
                status: this.props.taskEdit.status
            })
        }
        // console.log('will mount task form')
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEdit) {
            this.setState({
                id: nextProps.taskEdit.id,
                name: nextProps.taskEdit.name,
                status: nextProps.taskEdit.status
            })
        } else {
            this.setState({
                id: "",
                name: "",
                status: false,
            })
        }
        // console.log('nextprops')
    }
    onCloseForm = () => {
        this.props.onExitTaskForm()
    }
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name == 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })

    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state)
    }
    onClearTaskForm = () => {
        this.props.onClearTaskForm()
    }
    render() {
        let { id } = this.state;
        return (
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="panel panel-warning">
                    <div class="panel-heading">
                        <h3 class="panel-title">{id === '' ? "Thêm công việc" : 'Cập nhật công việc'}
                            <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label>Tên :</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <label>Trạng Thái :</label>
                            <select
                                class="form-control"
                                required="required"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br />
                            <div class="text-center">
                                <button type="submit" class="btn btn-warning" >{id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={this.onClearTaskForm}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Taskform;
