import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import immutable from 'immutable';
import './minimap.styl';

class MiniMap extends Component {
  renderPoint(id, isCurrent) {
    const className = classNames({
      current: isCurrent
    });
    return (
      <li key={id}>
        <a className={className} href="#"></a>
      </li>
    );
  }

  renderList() {
    const lastScreen = this.props.screens.get('lastScreen');
    const currentScreen = this.props.screens.get('currentScreen');
    const list = [];
    for (let i = 0; i <= lastScreen; i++)
      list.push(this.renderPoint(i, i === currentScreen));
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
