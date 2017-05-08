import React from 'react';

if (process.env.IS_BROWSER) {
  require('./EquipmentScreen.styl');
}

export default class EquipmentScreen extends React.PureComponent {

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
      <section className="equipment-screen screen">
        <h1>Equipment</h1>
        <h2>{this.props.candidate.role.id}</h2>
      </section>
    );
  }
}
