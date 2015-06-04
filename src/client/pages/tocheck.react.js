import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router';
import ToCheckItem from './tocheckitem.react';
import {msg, msgs} from '../intl/store';

class ToCheck extends Component {

  render() {
    return (
      <div className="tocheck">
        <h3>
          {msg('toCheck.header')}
        </h3>
        <ul>
          {msgs('toCheck.itemListHtml').map(
            (item) => <ToCheckItem item={item} key={item.get('key')} />
          )}
          <li>
            {msg('toCheck.isomorphicPage')} <Link to="/this-is-not-the-web-page-you-are-looking-for">404</Link>.
          </li>
          <li>
            {msg('toCheck.andMuchMore')}
          </li>
        </ul>
      </div>
    );
  }

}

export default ToCheck;
