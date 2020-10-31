import React, { Component } from 'react';
import '../App.css';
import Search from './search';
import Sort from './sort'

class Control extends Component {
    constructor(){
        super()
        this.state = {
            keyword:''
        }
    }
    onSearch=(keyword)=>{
        this.props.onSearch(keyword)
    }
    onSort = (sort)=>{
        this.props.onSort(sort)
    }
    render() {
        return (
            <div class="row mt-15">
                < Search onSearch={this.onSearch}/>
                < Sort onSort = {this.onSort}/>
            </div>
        )
    }
}

export default Control;
