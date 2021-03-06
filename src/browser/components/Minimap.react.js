import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

// if (process.env.IS_BROWSER) {
require('./Minimap.styl');
// }

const MiniMap = props => {
  const handleClick = (event, id) => {
    const {actions: {setScreen}} = props;
    event.preventDefault();
    setScreen(id);
  };

  const renderPoint = (id, currentScreen) => { // eslint-disable-line
    const isCurrent = id === currentScreen;
    const isInactive = id > currentScreen;
    const className = classNames({
      current: isCurrent,
      inactive: isInactive
    });
    const fx = (isInactive || isCurrent)
      ? e => { e.preventDefault(); }
      : e => handleClick(e, id);
    return (
      <li key={id}>
        <a className={className} href='#' onClick={fx} />
      </li>
    );
  };

  const renderList = () => {
    const {lastScreen, currentScreen} = props.screens;
    const list = [];
    for (let i = 0; i <= lastScreen; i++) {
      list.push(renderPoint(i, currentScreen));
    }
    return list;
  };

  const list = renderList();
  const className = classNames('minimap', props.className);

  return (
    <ul className={className}>
      {list}
    </ul>
  );
};

MiniMap.propTypes = {
  actions: PropTypes.object.isRequired,
  className: PropTypes.string,
  screens: PropTypes.object.isRequired
};

export default MiniMap;
