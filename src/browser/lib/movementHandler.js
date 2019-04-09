import React from 'react';
import PropTypes from 'prop-types';
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

    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    handleMouseWheel(e) {
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

      console.log('eeeeeloooo3');
      if (this.props.location.hash.length) return null;
      if (delta > 0)
        this.refs.baseComponent.handleMoveUp();
      else if (delta < 0)
        this.refs.baseComponent.handleMoveDown();
    }

    handleTouchStart(e) {
      this.swipeDetails.sY = e.touches[0].screenY;
      // Reset end as well in case user only clicked without moving
      console.log('eeeeeloooo2');
      console.log(e.touches[0].screenY);
      this.swipeDetails.eY = this.swipeDetails.sY;
    }

    handleTouchMove(e) {
      this.swipeDetails.eY = e.touches[0].screenY;
    }

    handleTouchEnd(e) {
      const delta = this.swipeDetails.eY - this.swipeDetails.sY;
      console.log('eeeeeloooo4');
      if (delta > 0) {
        this.refs.baseComponent.handleMoveUp();
      }
      else if (delta < 0) {
        this.refs.baseComponent.handleMoveDown();
      }

    }

    componentWillMount() {
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.handleMouseWheel = this.handleMouseWheel.bind(this);
      this.handleMouseWheel = throttle(this.handleMouseWheel, 1000, {
        'leading': true,
        'trailing': false
      });
    }

    componentDidMount() {
      window.addEventListener('mousewheel', this.handleMouseWheel, false);
      window.addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
      window.addEventListener('touchstart', this.handleTouchStart, {passive: false});
      window.addEventListener('touchmove', this.handleTouchMove, {passive: false});
      window.addEventListener('touchend', this.handleTouchEnd, {passive: false});
    }

    componentWillUnmount() {
      window.removeEventListener('mousewheel', this.handleMouseWheel);
      window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    }

    render() {
      return <BaseComponent {...this.props} ref='baseComponent' />;
    }
  };
}
