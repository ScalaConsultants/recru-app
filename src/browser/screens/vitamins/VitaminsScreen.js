import React from 'react';

if (process.env.IS_BROWSER) {
  require('./VitaminsScreen.styl');
}

export default class VitaminsScreen extends React.PureComponent {

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
      <section className="vitamins-screen screen">
        <h1>Vitamins</h1>
      </section>
    );
  }
}
