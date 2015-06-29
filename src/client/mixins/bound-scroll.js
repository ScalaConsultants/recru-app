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

  hasStartedAtBounds: function() {
    const element = React.findDOMNode(this);
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    return (this.swipeDetails.sScrollTop === 0 || this.swipeDetails.sScrollTop === maxScrollPosition);
  },

  handleMouseWheel: function(e) {
    if (this.isWithinBounds())
      e.stopPropagation();
  },

  handleTouchStart: function(e) {
    this.swipeDetails.sY = e.touches[0].screenY;
    this.swipeDetails.sScrollTop = React.findDOMNode(this).scrollTop;
  },

  handleTouchMove: function(e) {
    this.swipeDetails.eY = e.touches[0].screenY;
  },

  handleTouchEnd: function(e) {
    if (this.isWithinBounds() || !this.hasStartedAtBounds())
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
