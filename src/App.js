import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './App.css'
import TodoItem from './components/TodoItem'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      todoItems: [],
      todosFilter: []
    }
  }

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('todos')) || []
    this.setState({
      todoItems: data,
      todosFilter: data
    })
  }

  componentDidMount() {
    this.refs.textInput.focus()
  }

  async handleItemClicked(value) {
    const { todosFilter, todoItems } = this.state
    const index = this.findIndex(todosFilter, value)
    const _index = this.findIndex(todoItems, value)
    await this.setState({
      todosFilter: [
        ...todosFilter.slice(0, index),
        {
          ...value,
          isComplete: !value.isComplete
        },
        ...todosFilter.slice(index + 1)
      ],
      todoItems: [
        ...todoItems.slice(0, _index),
        {
          ...value,
          isComplete: !value.isComplete
        },
        ...todoItems.slice(_index + 1)
      ]
    })

    localStorage.setItem('todos', JSON.stringify(this.state.todoItems))
  }

  findIndex(items, item) {
    let index = -1
    items.forEach((element, i) => {
      if (element.title === item.title
      && element.isComplete === item.isComplete) {
        index = i
      }
    })
    return index
  }

  handleValueChange(e) {
    const { value } = e.target
    this.setState({ text: value})
  }

  async handleKeyUp(e) {
    if (e.keyCode !== 13) return

    const { todoItems, text } = this.state

    await this.setState({
      text: '',
      todoItems: [
        ...todoItems,
        {
          title: text,
          isComplete: false
        }
      ],
      todosFilter: [
        ...todoItems,
        {
          title: text,
          isComplete: false
        }
      ]
    })

    localStorage.setItem('todos', JSON.stringify(this.state.todoItems))
  }

  handleFilter(status) {
    const { todoItems } = this.state
    if (!todoItems) return

    this.setState({
      todosFilter: [
        ...todoItems.filter(item => {
          if (status === 0) return item
          if (status === -1) return item.isComplete === false
          return item.isComplete === true
        })
      ]
    })
  }

  render() {
    const { todosFilter } = this.state
    const countTodos = todosFilter.length

    return (
      <div className="App">
        <h1 className="App-title">todos({countTodos})</h1>
        <input
          className="input input-text"
          type="text"
          placeholder="Enter your todo..."
          value={this.state.text}
          onChange={this.handleValueChange.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          ref='textInput'
        />
        <div className="group-button">
          <button
            className="input input-button"
            type="button"
            onClick={this.handleFilter.bind(this, 0)}
          >
            All
          </button>
          <button
            className="input input-button"
            type="button"
            onClick={this.handleFilter.bind(this, -1)}
          >
            Active
          </button>
          <button
            className="input input-button"
            type="button"
            onClick={this.handleFilter.bind(this, 1)}
          >
            Completed
          </button>
        </div>
        {
          todosFilter.length > 0 && todosFilter.map((item, index) =>
            <TodoItem
              key={ index }
              item={ item }
              onClick={this.handleItemClicked.bind(this)}
            />
          )
        }
        {
          !todosFilter.length && <p className='empty'>Oh!!! Nothing...</p>
        }
      </div>
    );
  }
}

App.propTypes = {
  text: PropTypes.string,
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired
    })
  ),
  todosFilter: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired
    })
  )
}

export default App;
