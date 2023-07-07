import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      todos: [],
      inputValue: "",
    }
  }

  getTodos= () => {
    axios.get(URL)
    .then(res => 
      this.setState({...this.state, todos: res.data.data})
      )
  }
  componentDidMount() {
    this.getTodos();
  }
  onInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, inputValue: value})
  }
  resetForm = () => {
    this.setState({...this.state, inputValue: ""})
  }
  addTask = () => {
    axios.post(URL, { name: this.state.inputValue })
    .then(res => 
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
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
        if(todo.id !== id) {
          return todo
        }
        else{
          return res.data.data
        }
        })
      })
    })
    .catch(err => {
      debugger
    })
  }
  // // handleClick = (evt) => {
  // //   console.log(evt.target.id)
  // //   this.setState({
  // //     ...this.state,
  // //     todos: this.state.todos.map(todo => {
  // //       if(todo.id === evt.target.id) {
  // //         return{
  // //           ...todo,
  // //           completed: !todo.completed
  // //         }
  // //       } else {
  // //         return todo;
  // //       }
  // //     })
  // //   })
  // // }
  
  // handleClear = () => {
  //   this.state.todos.map(todo => {
  //     if(todo.completed === true) {
  //       console.log(`${todo.id}`)
  //       // axios.delete(`http://localhost9000/api/todos/${todo.id}`)
  //       // .then(res => {
  //       //   console.log(`deleted post with id ${todo.id}`)
  //       // })
  //       // .catch(err => console.error(err))
  //     }
  //   })
  //   this.setState({
  //     ...this.state,
  //     todos: this.state.todos.filter(todo => {
  //       return (todo.completed === false)
  //     })
  //   })
  // }



  render() {

    return (
      <div className='app'>
        <div id="todos">
          <h2>Todos:</h2>
            {
              this.state.todos.map(todo => {
                return <div onClick={this.toggleComplete(todo.id)}>{todo.name} {todo.completed ? "✔️" : "❌"}</div>
              })
            }
        </div>
        <form 
          id="todoForm"
          onSubmit={this.handleSubmit}>
          <input
            onChange={this.onInputChange} 
            value={this.state.inputValue} 
            type="text" 
            placeholder="Type Todo"></input>
          <input 
            type="submit">
          </input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
  }
