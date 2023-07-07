import React from 'react'
import axios from 'axios';


export default class Form extends React.Component {
  constructor() {
    super();

  }




  render() {
    return (
      <>
        <form
          id="todoForm"
          onSubmit={this.props.handleSubmit}>
          <input
            onChange={this.props.onInputChange}
            value={this.props.inputValue}
            type="text"
            placeholder="Type Todo">
          </input>
          <input
            type="submit">
          </input>
        </form>
        <button
          onClick={this.props.toggleDisplayCompleted}
        >
          {this.props.displayCompleted ? "Hide" : "Show"} Completed
        </button>
      </>
    )
  }
}
