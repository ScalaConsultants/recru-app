import Component from 'react-pure-render/component';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./Minimap.styl');
}

export default class MiniMap extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    className: PropTypes.string,
    screens: PropTypes.object.isRequired
  }

  handleClick(event, id) {
    const {actions: {setScreen}} = this.props;
    event.preventDefault();
    setScreen(id);
  }

  renderPoint(id, currentScreen) {
    const isCurrent = id === currentScreen;
    const isInactive = id > currentScreen;
    const className = classNames({
      current: isCurrent,
      inactive: isInactive
    });
    const fx = (isInactive || isCurrent) ?
      ((e) => { e.preventDefault(); }) :
      ((e) => this.handleClick(e, id));
    return (
      <li key={id}>
        <a className={className} href="#" onClick={fx}></a>
      </li>
    );
  }

  renderList() {
    const {lastScreen, currentScreen} = this.props.screens;
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
