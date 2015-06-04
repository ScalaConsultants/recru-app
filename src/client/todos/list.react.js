import Component from '../components/component.react';
import React from 'react';
import Todo from './todo.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

class List extends Component {

  render() {
    const todos = this.props.todos;

    if (!todos.size)
      return (
        <p>{msg('todos.emptyList')}</p>
      );

    return (
      <ol className="todo-list">
        {todos.map((todo, i) =>
          <Todo
            editable={this.props.editables.get(todo.id)}
            key={todo.id}
            /* TODO: Pass concrete pending action. */
            pendingActions={this.props.pendingActions}
            todo={todo}
          />
        )}
      </ol>
    );
  }

}

List.propTypes = {
  editables: React.PropTypes.instanceOf(immutable.Map).isRequired,
  pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
  todos: React.PropTypes.instanceOf(immutable.List)
};

export default List;
