import throttle from 'lodash.throttle';

// TODO: shall be refactored into a higher order component
export default {
  handleMouseWheel: function(e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0)
      this.handleMoveUp();
    else if (delta < 0)
      this.handleMoveDown();
  },

  componentWillMount: function() {
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.handleMouseWheel = throttle(this.handleMouseWheel, 1000, {
      'leading': true,
      'trailing': false
    });
  },

  componentDidMount: function() {
    window.addEventListener('mousewheel', this.handleMouseWheel, false);
    window.addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
  }
};
