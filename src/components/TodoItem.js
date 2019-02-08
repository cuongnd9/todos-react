import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired
  }),
  onClick: PropTypes.func.isRequired
}

export default TodoItem
