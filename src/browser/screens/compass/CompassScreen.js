import React from 'react';

if (process.env.IS_BROWSER) {
  require('./CompassScreen.styl');
}

export default class CompassScreen extends React.PureComponent {

  constructor() {
    super();
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  handleMoveDownKeys() {
    this.proceed();
  }

  render() {
    return (
      <section className="compass-screen screen">
        <h1>Compass</h1>
        <h2>{this.props.candidate.role.id}</h2>
      </section>
    );
  }
}
