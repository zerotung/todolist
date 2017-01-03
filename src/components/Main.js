require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class TodolistItem extends React.Component {

    handleClick() {

        this.props.complete();
    }

    render() {

        let isComplete = this.props.data.isComplete ? 'checked' : '';

        return (
            <section className="todolist-item">
                <input className="todolist-item-checkbox" type="checkbox" checked={isComplete}
                        onChange={()=>this.handleClick()}/>
                <div className="todolist-item-content">{this.props.data.content}</div>
                <span className="todolist-item-delete">delete</span>
            </section>
        );
    }
}

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: '0',
                content: '吃饭',
                isComplete: false
            }, {
                id: '1',
                content: '睡觉',
                isComplete: true
            }, {
                id: '2',
                content: '打豆豆',
                isComplete: false
            }]
        }
    }

    handleComplete(index) {

        return function() {

            let data = this.state.data;
            data[index].isComplete = !data[index].isComplete;
            this.setState({
                data: data
            });
        }.bind(this);
    }

    handleAdd() {

        let data = this.state.data,
            content = this.refs.inputBox.value,
            id = '' + data.length;

        data.push({
            id: id,
            content: content,
            inComplete: false
        })

        this.refs.inputBox.value = '';

        this.setState({
            data: data
        })
    }

    render() {

        let data = this.state.data,
            todolistArr = [],
            completedTaskNum = 0;

        data.forEach((value, index) => {
            todolistArr.push(<TodolistItem data={value} key={index}
                    complete={this.handleComplete(index)}/>)
        })

        completedTaskNum = data.reduce((x, y) => {
            return y.isComplete ? x + 1 : x;
        }, 0)

        let statusBar = <section className="status-bar">已完成 {completedTaskNum} / {data.length} </section>

        return (
            <section className="stage">
                <section className="todolist-wrap">
                    <h1 className="todolist-title">Todo List</h1>
                    <hr />
                    <section className="todolist-body">
                        {todolistArr}
                    </section>
                        {statusBar}
                    <hr />
                    <section className="todolist-input">
                        <input className="todolist-input-box" placeholder="请输入要添加的待办事宜"
                                type="text" ref="inputBox" />
                        <div className="todolist-input-btn" onClick={()=>this.handleAdd()}>添加</div>
                    </section>
                </section>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;