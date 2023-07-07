import React from 'react'

export default class Todo extends React.Component {
  constructor() {
    super();

  }
  // componentDidUpdate() {
  //   console.log('updated')
  // }
  render() {
    return (
      <div onClick={this.props.toggleComplete(this.props.todo.id)}>
        {this.props.todo.name} {this.props.todo.completed ? "✔️" : ""}
      </div>
    )
  }
}
