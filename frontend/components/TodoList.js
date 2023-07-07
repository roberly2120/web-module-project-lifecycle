import React from 'react'
import Todo from './Todo';


export default class TodoList extends React.Component {
  constructor() {
    super();

  }
  


  render() {
    return (
      <div id="todos">
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((accumulator, todo) => {
            if (this.props.displayCompleted || !todo.completed) return accumulator.concat(
              <Todo
                key={todo.id}
                toggleComplete={this.props.toggleComplete}
                todo={todo}
              />
            )
            return accumulator
          }, [])
        }
      </div>
    )
  }
}
