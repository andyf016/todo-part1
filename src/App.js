import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };

  handleToggleComplete = (event, todoIdToToggle) => {
    const newTodos = this.state.todos.slice();
    const newnewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        todo.completed = !todo.completed;
      }

      return todo;
    });
    this.setState({ todos: newnewTodos });
  };

  handleAddTodo = event => {
    if (event.key === "Enter") {
      // hot to create a new todo
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 10000),
        title: event.target.value,
        completed: false
      };

      //update component state to reflect new todo

      //create a copy of the data that you want to update
      const newTodos = this.state.todos.slice();
      //modify the copy
      newTodos.push(newTodo);
      //overwrite the original with the copy
      //this.setState tells reacct that we need to do a re-render

      this.setState({ todos: newTodos });
      event.target.value = "";
    }
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    const newTodoList = this.state.todos.filter(todo=>{
      if(todo.id === todoIdToDelete){
        return false;
      }
      return true;
    })
    this.setState({todos: newTodoList})
  }

  handleClearCompletedTodos = event =>{
    const newTodoList = this.state.todos.filter(todo=>{
      if(todo.completed === true){
        return false;
      }
      return true;
    })
    this.setState({todos: newTodoList})
  }

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleToggleComplete={this.handleToggleComplete}
          handleDeleteTodo = {this.handleDeleteTodo}
        />
        <footer className='footer'>
          <span className='todo-count'>
            <strong>0</strong> item(s) left
          </span>
          <button className='clear-completed' onClick={this.handleClearCompletedTodos}>Clear completed</button>
        </footer>
      </section>
    );
  }
}
//this.props.handleToggleComplete
class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={this.props.completed}
            onChange={this.props.handleToggleComplete}
          />
          <label>{this.props.title}</label>
          <button className='destroy' onClick={this.props.handleDeleteTodo} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className='main'>
        <ul className='todo-list'>
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              handleDeleteTodo = {event => 
                this.props.handleDeleteTodo(event, todo.id)
              }
              handleToggleComplete={event =>
                this.props.handleToggleComplete(event, todo.id)
              }
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
