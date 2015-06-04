import * as actions from '../todos/actions';
import Component from '../components/component.react';
import React from 'react';
// import {FormattedMessage} from 'react-intl';
import {msg} from '../intl/store';

class TodoButtons extends Component {

  render() {
    return (
      <div className="buttons">
        <button
          children={msg('todos.clearAll')}
          disabled={!this.props.clearAllEnabled}
          onClick={actions.clearAll}
        />
        <button
          children={msg('todos.add100')}
          onClick={actions.addHundredTodos}
        />
        {/* TODO: Reimplement undo. */}
        {/*<button
          disabled={undoStates.length === 1}
          onClick={() => this.undo()}
        ><FormattedMessage
          message={msg('todos.undo')}
          steps={undoStates.length - 1}
        /></button>*/}
      </div>
    );
  }

}

TodoButtons.propTypes = {
  clearAllEnabled: React.PropTypes.bool.isRequired
};

export default TodoButtons;
