import throttle from 'lodash.throttle';

// TODO: shall be refactored into a higher order component
export default {
  swipeDetails: {
    sY: 0,
    eY: 0
  },

  handleMouseWheel: function(e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0)
      this.handleMoveUp();
    else if (delta < 0)
      this.handleMoveDown();
  },

  handleTouchStart: function(e) {
    this.swipeDetails.sY = e.touches[0].screenY;
  },

  handleTouchMove: function(e) {
    this.swipeDetails.eY = e.touches[0].screenY;
  },

  handleTouchEnd: function(e) {
    const delta = this.swipeDetails.eY - this.swipeDetails.sY;
    if (delta > 0)
      this.handleMoveUp();
    else if (delta < 0)
      this.handleMoveDown();
  },

  componentWillMount: function() {
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.handleMouseWheel = throttle(this.handleMouseWheel, 1000, {
      'leading': true,
      'trailing': false
    });
  },

  componentDidMount: function() {
    window.addEventListener('mousewheel', this.handleMouseWheel, false);
    window.addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
    window.addEventListener('touchstart', this.handleTouchStart, false);
    window.addEventListener('touchmove', this.handleTouchMove, false);
    window.addEventListener('touchend', this.handleTouchEnd, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }
};
