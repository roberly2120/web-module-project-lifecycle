import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      inputValue: "",
      displayCompleted: true,
    }
  }

  getTodos = () => {
    axios.get(URL)
      .then(res =>
        this.setState({ ...this.state, todos: res.data.data })
      )
  }
  componentDidMount() {
    this.getTodos();
  }
  onInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, inputValue: value })
  }
  resetForm = () => {
    this.setState({ ...this.state, inputValue: "" })
  }
  addTask = () => {
    axios.post(URL, { name: this.state.inputValue })
      .then(res =>
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        //not quite sure why this functions any differently than just getTodos();
        //more efficient to not run a second axios request. front end surgery 
      )
      .catch(err => console.error(err))
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.addTask()
    this.resetForm()
  }
  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(todo => {
            if (todo.id !== id) {
              return todo
            }
            else {
              return res.data.data
            }
          })
        })
      })
      .catch(err => {
        debugger
      })
  }
  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }

  render() {

    return (
      <div className='app'>
        <TodoList
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleComplete={this.toggleComplete}
        />
        <Form
          handleSubmit={this.handleSubmit}
          onInputChange={this.onInputChange}
          inputValue={this.state.inputValue}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
