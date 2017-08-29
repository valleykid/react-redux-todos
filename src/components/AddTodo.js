import React from 'react'

let AddTodo = () => {
  return (
    <div>
      <form>
        <input ref={node => {
          global.input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
