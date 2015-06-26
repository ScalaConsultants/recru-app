import React from 'react';

export default {
  handleMouseWheel: function(e) {
    // Stop wheel event propagation if not at the topmost or bottommost part
    const element = React.findDOMNode(this);
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    if (element.scrollTop > 0 && element.scrollTop < maxScrollPosition)
      e.stopPropagation();
  },

  componentWillMount: function() {
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
  },

  componentDidMount: function() {
    React.findDOMNode(this).addEventListener('mousewheel', this.handleMouseWheel, false);
    React.findDOMNode(this).addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
  },

  componentWillUnmount: function() {
    React.findDOMNode(this).removeEventListener('mousewheel', this.handleMouseWheel);
    React.findDOMNode(this).removeEventListener('DOMMouseScroll', this.handleMouseWheel);
  }
};
