import Component from 'react-pure-render/component';
import React from 'react';
import JoinUsScreen from './joinUs/JoinUsScreen';
import WaysInfoScreen from './waysInfo/WaysInfoScreen';
import ChoosePathScreen from './choosePath/ChoosePathScreen';
import BackpackScreen from './backpack/BackpackScreen';
import VitaminsScreen from './vitamins/VitaminsScreen';
import CompassScreen from './compass/CompassScreen';
import EquipmentScreen from './equipment/EquipmentScreen';
import SkillsScreen from './skills/SkillsScreen';
import SubmitScreen from './submit/SubmitScreen';
import movementHandler from '../lib/movementHandler';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

@movementHandler
export default class Screens extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    screens: PropTypes.object.isRequired
  }

  getPageOffset() {
    return -(this.props.screens.currentScreen * 100);
  }

  getRefNameFor(screen) {
    return this.props.screens.currentScreen === screen ? 'currentScreen' : null;
  }

  handleMoveDownKeys() {
    if (typeof this.refs.currentScreen.handleMoveDownKeys === 'function') {
      this.refs.currentScreen.handleMoveDownKeys();
    }
  }

  handleMoveUp() {
    if (typeof this.refs.currentScreen.handleMoveUp === 'function') {
      this.refs.currentScreen.handleMoveUp();
    }

    const {actions: {previousScreen}} = this.props;
    previousScreen();
  }

  handleMoveDown() {
    if (typeof this.refs.currentScreen.proceed === 'function')
      this.refs.currentScreen.proceed();
  }

  render() {
    const translate = `translate3d(0%, ${this.getPageOffset()}%, 0)`;
    const listStyle = {
      transform: translate,
      WebkitTransform: translate
    };

    return (
      <div className="screen-list" style={listStyle}>
        <Helmet title='Join Us'/>
        <JoinUsScreen actions={this.props.actions}
                      ref={this.getRefNameFor(0)}/>

        <WaysInfoScreen actions={this.props.actions}
                        ref={this.getRefNameFor(1)}/>

        <ChoosePathScreen actions={this.props.actions}
                          ref={this.getRefNameFor(2)}/>

        <BackpackScreen actions={this.props.actions}
                        ref={this.getRefNameFor(3)}
                        screens={this.props.screens}/>

        <VitaminsScreen actions={this.props.actions}
                        ref={this.getRefNameFor(4)}
                        screens={this.props.screens}/>

        <CompassScreen actions={this.props.actions}
                       candidate={this.props.candidate}
                       ref={this.getRefNameFor(5)}
                       screens={this.props.screens}/>

        <EquipmentScreen actions={this.props.actions}
                         candidate={this.props.candidate}
                         ref={this.getRefNameFor(6)}
                         screens={this.props.screens}/>

        <SkillsScreen actions={this.props.actions}
                      candidate={this.props.candidate}
                      ref={this.getRefNameFor(7)}/>

        <SubmitScreen actions={this.props.actions}
                      candidate={this.props.candidate}
                      config={this.props.config}
                      ref={this.getRefNameFor(8)}/>
      </div>
    );
  }
}
