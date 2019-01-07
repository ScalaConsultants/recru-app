import React from 'react';
import Component from 'react-pure-render/component';

import ScreenImage from '../components/ScreenImage.react';
import JobDescription from '../components/JobDescription.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';
import roles from '../data/roles.json';

if (process.env.IS_BROWSER) {
  require('./Position.styl');
}

@boundScroll()
export default class Position extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  render() {
    const role = roles[this.props.candidate.role.id] || {'img':''};

    return (
      <section className="position-screen screen">
        <div className="container">
          <ScreenImage data={role} />
          <div className="right">
            <JobDescription data={role} />
            <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
