import React from 'react';

// TODO: shall be refactored into a higher order component
export default {
  swipeDetails: {
    sY: 0,
    eY: 0,
    sScrollTop: 0
  },

  isWithinBounds: function() {
    // Stop wheel event propagation if not at the topmost or bottommost part
    const element = React.findDOMNode(this);
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    return (element.scrollTop > 0 && element.scrollTop < maxScrollPosition);
  },

  isScrollDeltaWithinBounds: function(delta) {
    const element = React.findDOMNode(this);
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    return (element.scrollTop === 0 && delta < 0) || (element.scrollTop === maxScrollPosition && delta > 0);
  },

  hasSwipeStartedAtBounds: function(delta) {
    const element = React.findDOMNode(this);
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    return ((this.swipeDetails.sScrollTop === 0 && delta > 0) || (this.swipeDetails.sScrollTop === maxScrollPosition && delta < 0));
  },

  handleMouseWheel: function(e) {
    if (this.isWithinBounds() || this.isScrollDeltaWithinBounds(e.wheelDelta || -e.detail))
      e.stopImmediatePropagation();
  },

  handleTouchStart: function(e) {
    this.swipeDetails.sY = e.touches[0].screenY;
    // Reset end as well in case user only clicked without moving
    this.swipeDetails.eY = this.swipeDetails.sY;
    this.swipeDetails.sScrollTop = React.findDOMNode(this).scrollTop;
  },

  handleTouchMove: function(e) {
    this.swipeDetails.eY = e.touches[0].screenY;
  },

  handleTouchEnd: function(e) {
    const delta = (this.swipeDetails.eY - this.swipeDetails.sY);
    if (this.isWithinBounds() || !this.hasSwipeStartedAtBounds(delta))
      e.stopPropagation();
  },

  componentWillMount: function() {
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
  },

  componentDidMount: function() {
    React.findDOMNode(this).addEventListener('mousewheel', this.handleMouseWheel, false);
    React.findDOMNode(this).addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
    React.findDOMNode(this).addEventListener('touchstart', this.handleTouchStart, false);
    React.findDOMNode(this).addEventListener('touchmove', this.handleTouchMove, false);
    React.findDOMNode(this).addEventListener('touchend', this.handleTouchEnd, false);
  },

  componentWillUnmount: function() {
    React.findDOMNode(this).removeEventListener('mousewheel', this.handleMouseWheel);
    React.findDOMNode(this).removeEventListener('DOMMouseScroll', this.handleMouseWheel);
    React.findDOMNode(this).removeEventListener('touchstart', this.handleTouchStart);
    React.findDOMNode(this).removeEventListener('touchmove', this.handleTouchMove);
    React.findDOMNode(this).removeEventListener('touchend', this.handleTouchEnd);
  }
};
