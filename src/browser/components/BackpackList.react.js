import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./BackpackList.styl');
}

export default class BackpackList extends Component {
  static propTypes = {
    animate: React.PropTypes.bool.isRequired,
    delayBetween: React.PropTypes.number,
    delayStart: React.PropTypes.number,
    items: React.PropTypes.array.isRequired,
    onAnimationFinished: React.PropTypes.func
  }

  static defaultProps = {
    animate: false,
    delayBetween: 200,
    delayStart: 0,
    items: [''],
    onAnimationFinished: () => {}
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      items: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate === this.props.animate) {
      return;
    }

    if (nextProps.animate) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(this.pushItems.bind(this), this.props.delayBetween);
    }
  }

  pushItems() {
    if (!this.itemsStack) {
      this.itemsStack = [...this.props.items];
    }

    if (!this.itemsStack.length) {
      clearInterval(this.animationInterval);
      this.props.onAnimationFinished();
      return;
    }

    this.setState({
      items: [...this.state.items, this.itemsStack.shift()]
    });
  }

  render() {
    return (
      <ul className="backpack-list">
        {this.state.items.map((item, idx) =>
          <li key={idx}>{item}</li>
        )}
      </ul>
    );
  }
}
