import React from 'react';
import Component from 'react-pure-render/component';
import throttle from 'lodash.throttle';

export default function movementHandler(BaseComponent) {

  return class MovementHandlerDecorator extends Component {
    constructor(props) {
      super(props);
      this.swipeDetails = {
        sY: 0,
        eY: 0
      };
    }

    handleMouseWheel(e) {
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      if (delta > 0)
        this.refs.baseComponent.handleMoveUp();
      else if (delta < 0)
        this.refs.baseComponent.handleMoveDown();
    }

    handleTouchStart(e) {
      this.swipeDetails.sY = e.touches[0].screenY;
      // Reset end as well in case user only clicked without moving
      this.swipeDetails.eY = this.swipeDetails.sY;
    }

    handleTouchMove(e) {
      this.swipeDetails.eY = e.touches[0].screenY;
    }

    handleTouchEnd(e) {
      const delta = this.swipeDetails.eY - this.swipeDetails.sY;
      if (delta > 0)
        this.refs.baseComponent.handleMoveUp();
      else if (delta < 0)
        this.refs.baseComponent.handleMoveDown();
    }

    handleKeyUp(e) {
      const ENTER_KEY = 13;
      const TAB_KEY = 9;
      const ARROW_UP_KEY = 38;
      const ARROW_DOWN_KEY = 40;

      if (e.keyCode === ENTER_KEY || e.keyCode === TAB_KEY || e.keyCode === ARROW_DOWN_KEY) {
        this.refs.baseComponent.handleMoveDownKeys();
      }
      if (e.keyCode === ARROW_UP_KEY) {
        this.refs.baseComponent.handleMoveUp();
      }
    }

    componentWillMount() {
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.handleMouseWheel = this.handleMouseWheel.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleMouseWheel = throttle(this.handleMouseWheel, 1000, {
        'leading': true,
        'trailing': false
      });
    }

    componentDidMount() {
      window.addEventListener('mousewheel', this.handleMouseWheel, false);
      window.addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
      window.addEventListener('touchstart', this.handleTouchStart, false);
      window.addEventListener('touchmove', this.handleTouchMove, false);
      window.addEventListener('touchend', this.handleTouchEnd, false);
      window.addEventListener('keyup', this.handleKeyUp, false);
    }

    componentWillUnmount() {
      window.removeEventListener('mousewheel', this.handleMouseWheel);
      window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
      window.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
      return <BaseComponent {...this.props} ref='baseComponent' />;
    }
  };
}
