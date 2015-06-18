import Component from '../components/component.react';
import * as actions from '../screens/actions';
import classNames from 'classnames';
import React from 'react';
import immutable from 'immutable';
import './minimap.styl';

class MiniMap extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, id) {
    event.preventDefault();
    actions.setScreen(id);
  }

  renderPoint(id, currentScreen) {
    const isCurrent = id === currentScreen;
    const isInactive = id > currentScreen;
    const className = classNames({
      current: isCurrent,
      inactive: isInactive
    });
    const fx = (isInactive || isCurrent) ?
      ((e) => {}) :
      ((e) => this.handleClick(e, id));
    return (
      <li key={id}>
        <a className={className} href="#" onClick={fx}></a>
      </li>
    );
  }

  renderList() {
    const lastScreen = this.props.screens.get('lastScreen');
    const currentScreen = this.props.screens.get('currentScreen');
    const list = [];
    for (let i = 0; i <= lastScreen; i++)
      list.push(this.renderPoint(i, currentScreen));
    return list;
  }

  render() {
    const list = this.renderList();
    const className = classNames('minimap', this.props.className);
    return (
      <ul className={className}>
        {list}
      </ul>
    );
  }
}

MiniMap.propTypes = {
  className: React.PropTypes.string,
  screens: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default MiniMap;
