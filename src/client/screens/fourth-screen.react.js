import Component from '../components/component.react';
import Chevron from '../components/chevron.react';
import React from 'react';
import * as actions from './actions';
import './fourth-screen.styl';

export default class FourthScreen extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
  }

  proceed() {
    // TODO: if the name is empty do not allow the transition and show the error
    actions.nextScreen();
  }  
    
  render() {
    return (
      <section className="fourth-screen screen">
        <header>pack your bag</header>
        <ul>
          <li>
            <img alt="Angular" src="assets/img/frontend/angular.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
          <li>
            <img alt="Html 5" src="assets/img/frontend/html5.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="Css 3" src="assets/img/frontend/css3.svg"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="React.js" src="assets/img/frontend/react.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="Ember.js" src="assets/img/frontend/ember.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="Node.js" src="assets/img/frontend/node.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="Vanilla.js" src="assets/img/frontend/js.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
          <li>
            <img alt="Angular" src="assets/img/generic/github.png"/>
            <div>
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
              <img src="assets/img/arrow2.svg" />
            </div>
          </li>
        </ul>

        <Chevron isAnimated={true} onClick={this.proceed}/>  
      </section>
    );
  }

}
