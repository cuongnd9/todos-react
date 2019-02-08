import React, { Component } from 'react'
import classNames from 'classnames'
import './TodoItem.css'

class TodoItem extends Component {
  render() {
    const { item, onClick } = this.props
    const className = classNames(
      'TodoItem',
      {
        'TodoItem-complete': item.isComplete
      }
    )
    return (
      <div 
        onClick={onClick.bind(this, this.props.item)} 
        className={className}
      >
        <p>{this.props.item.title}</p>
      </div>
    )
  }
}

export default TodoItem
