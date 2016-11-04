import Component from 'react-pure-render/component';
import React from 'react';
import backpackList from '../data/backpackListItems.json';

if (process.env.IS_BROWSER) {
  require('./BackpackList.styl');
}

export default class BackpackList extends Component {

  animateBackpack(e) {
    const backpackImg = document.getElementById('bag-img');
    if (backpackImg.classList.contains('animateBackpackStyle')) {
      backpackImg.classList.remove('animateBackpackStyle');
    }
    else {
      backpackImg.classList.add('animateBackpackStyle');
    }
  }

  render() {
    const backpackListItems = backpackList.equipment;
    return (
      <div className="screen-list">
        <ul className="backpack-list">
          {backpackListItems.map((item, idx) =>
            <li key={idx} onMouseEnter={e => this.animateBackpack(e)}
                onMouseLeave={e => this.animateBackpack(e)}
            >
              {item}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
