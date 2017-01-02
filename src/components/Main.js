require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class TodolistItem extends React.Component {

    render() {
        return (
            <section className="todolist-item">
                <input className="todolist-item-checkbox" type="checkbox" />
                <div className="todolist-item-content">{this.props.data.content}</div>
                <span className="todolist-item-delete">delete</span>
            </section>
        );
    }
}

class TodolistInput extends React.Component {

    render() {
        return (
            <section className="todolist-input">
                <input type="text" placeholder="请输入要添加的待办事宜" />
                <button>添加</button>
            </section>
        );
    }
}

class AppComponent extends React.Component {

    constructor() {
        super();
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

    render() {

        let data = this.state.data,
            todolistArr = [],
            completedTaskNum = 0;

        data.forEach((value, index) => {
            todolistArr.push(<TodolistItem data={value} key={index} />)
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
                    <section className="todolist-add">
                        <TodolistInput />
                    </section>
                </section>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;