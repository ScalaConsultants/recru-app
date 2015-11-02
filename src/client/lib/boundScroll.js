import React from 'react';
import Component from 'react-pure-render/component';

export default function boundScroll() {
  return BaseComponent => class BoundScrollDecorator extends Component {
    constructor(props) {
      super(props);
      this.swipeDetails = {
        sY: 0,
        eY: 0,
        sScrollTop: 0
      };
    }

    proceed() {
      if (typeof this.refs.baseComponent.proceed === 'function')
        this.refs.baseComponent.proceed();
    }

    isWithinBounds() {
      // Stop wheel event propagation if not at the topmost or bottommost part
      const element = React.findDOMNode(this);
      const maxScrollPosition = element.scrollHeight - element.clientHeight;
      return (element.scrollTop > 0 && element.scrollTop < maxScrollPosition);
    }

    isScrollDeltaWithinBounds(delta) {
      const element = React.findDOMNode(this);
      const maxScrollPosition = element.scrollHeight - element.clientHeight;
      return maxScrollPosition !== 0 && ((element.scrollTop === 0 && delta < 0) || (element.scrollTop === maxScrollPosition && delta > 0));
    }

    hasSwipeStartedAtBounds(delta) {
      const element = React.findDOMNode(this);
      const maxScrollPosition = element.scrollHeight - element.clientHeight;
      return ((this.swipeDetails.sScrollTop === 0 && delta > 0) || (this.swipeDetails.sScrollTop === maxScrollPosition && delta < 0));
    }

    handleMouseWheel(e) {
      if (this.isWithinBounds() || this.isScrollDeltaWithinBounds(e.wheelDelta || -e.detail))
        e.stopImmediatePropagation();
    }

    handleTouchStart(e) {
      this.swipeDetails.sY = e.touches[0].screenY;
      // Reset end as well in case user only clicked without moving
      this.swipeDetails.eY = this.swipeDetails.sY;
      this.swipeDetails.sScrollTop = React.findDOMNode(this).scrollTop;
    }

    handleTouchMove(e) {
      this.swipeDetails.eY = e.touches[0].screenY;
    }

    handleTouchEnd(e) {
      const delta = (this.swipeDetails.eY - this.swipeDetails.sY);
      if (this.isWithinBounds() || !this.hasSwipeStartedAtBounds(delta))
        e.stopPropagation();
    }

    componentWillMount() {
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.handleMouseWheel = this.handleMouseWheel.bind(this);
    }

    componentDidMount() {
      React.findDOMNode(this.refs.baseComponent).addEventListener('mousewheel', this.handleMouseWheel, false);
      React.findDOMNode(this.refs.baseComponent).addEventListener('DOMMouseScroll', this.handleMouseWheel, false);
      React.findDOMNode(this.refs.baseComponent).addEventListener('touchstart', this.handleTouchStart, false);
      React.findDOMNode(this.refs.baseComponent).addEventListener('touchmove', this.handleTouchMove, false);
      React.findDOMNode(this.refs.baseComponent).addEventListener('touchend', this.handleTouchEnd, false);
    }

    componentWillUnmount() {
      React.findDOMNode(this.refs.baseComponent).removeEventListener('mousewheel', this.handleMouseWheel);
      React.findDOMNode(this.refs.baseComponent).removeEventListener('DOMMouseScroll', this.handleMouseWheel);
      React.findDOMNode(this.refs.baseComponent).removeEventListener('touchstart', this.handleTouchStart);
      React.findDOMNode(this.refs.baseComponent).removeEventListener('touchmove', this.handleTouchMove);
      React.findDOMNode(this.refs.baseComponent).removeEventListener('touchend', this.handleTouchEnd);
    }

    render() {
      return <BaseComponent {...this.props} ref='baseComponent' />;
    }
  };
}
