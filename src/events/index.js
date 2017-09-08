import { connect } from 'react-redux'
import { addTodo, setVisibilityFilter, toggleTodo } from '../actions'
import { create } from 'react-magic-component'

// AddTodo
create('AddTodo', {
  connect: connect(),
  props: {
    'onSubmit form': function(e) {
      e.preventDefault()
      let input = global.input;
      if (!input.value.trim()) {
        return
      }
      this.props.dispatch(addTodo(input.value))
      input.value = ''
    }
  },
});


// TodoList
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToPropsForTodoList = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToPropsForTodoList = {
  onTodoClick: toggleTodo
}

create('TodoList', {
  connect: connect(mapStateToPropsForTodoList, mapDispatchToPropsForTodoList),
  props: {
    'onClick Todo > li': function(e, elInst, ...params) {
      this.props.onTodoClick(elInst.props.id);
    }
  }
});


// Link
const mapStateToPropsForLink = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToPropsForLink = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
});

create('Link', {
  connect: connect(mapStateToPropsForLink, mapDispatchToPropsForLink),
  props: {
    'onClick a': function(e) {
      e.preventDefault();
      this.props.onClick();
    }
  }
});
