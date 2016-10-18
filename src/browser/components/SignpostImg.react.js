import Component from 'react-pure-render/component';
import React from 'react';
import backpackList from '../data/backpackListItems.json';

if (process.env.IS_BROWSER) {
  require('./SignpostImg.styl');
}

export default class SignpostImg extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animate: React.PropTypes.bool.isRequired,
    benefits: React.PropTypes.array.isRequired,
    delayBetween: React.PropTypes.number,
    delayStart: React.PropTypes.number
  }

  static defaultProps = {
    animate: false,
    delayBetween: 800,
    delayStart: 1000,
    benefits: ['']
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      animate: false,
      feet: [],
      benefits: []
    };
  }

  proceed() {
    const {actions: {nextScreen}} = this.props;
    nextScreen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate === this.props.animate) {
      return;
    }

    if (nextProps.animate) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(this.pushItems.bind(this));
      clearInterval(this.benefitsInterval);
      this.benefitsInterval = setInterval(this.pushBenefits.bind(this), this.props.delayBetween);
    }
  }

  pushBenefits() {
    if (!this.itemsStack) {
      this.itemsStack = [...backpackList.benefits];
    }

    if (!this.itemsStack.length) {
      clearInterval(this.benefitsInterval);
      return;
    }

    this.setState({
      benefits: [...this.state.benefits, this.itemsStack.shift()]
    });
  }

  pushItems() {
    this.setState({
      feet: [
        {'bottom': 55, 'left': 3, 'rotation': 90, 'delay': 0.2, 'scale': 0.35},
        {'bottom': 45, 'left': 8, 'rotation': 90, 'delay': 0.5, 'scale': 0.4},
        {'bottom': 55, 'left': 13, 'rotation': 90, 'delay': 0.8, 'scale': 0.45},
        {'bottom': 45, 'left': 18, 'rotation': 90, 'delay': 1.1, 'scale': 0.5},
        {'bottom': 55, 'left': 23, 'rotation': 90, 'delay': 1.4, 'scale': 0.55},
        {'bottom': 45, 'left': 28, 'rotation': 90, 'delay': 1.7, 'scale': 0.6},
        {'bottom': 55, 'left': 33, 'rotation': 90, 'delay': 2.0, 'scale': 0.65},
        {'bottom': 45, 'left': 38, 'rotation': 90, 'delay': 2.3, 'scale': 0.7},
        {'bottom': 55, 'left': 43, 'rotation': 90, 'delay': 2.6, 'scale': 0.75},
        {'bottom': 45, 'left': 48, 'rotation': 90, 'delay': 2.9, 'scale': 0.8},
        {'bottom': 55, 'left': 53, 'rotation': 90, 'delay': 3.2, 'scale': 0.85},
        {'bottom': 45, 'left': 58, 'rotation': 90, 'delay': 3.5, 'scale': 0.9},
        {'bottom': 56, 'left': 65, 'rotation': 66, 'delay': 4.4, 'scale': 0.95},
        {'bottom': 48, 'left': 70, 'rotation': 60, 'delay': 4.7, 'scale': 1.0}
        // {'bottom': 31, 'left': 71, 'rotation': 27, 'delay': 5.0}
        // {'bottom': 25, 'left': 78, 'rotation': 37, 'delay': 5.3}
        // {'bottom': 47, 'left': 73, 'rotation': 0, 'delay': 5.6},
        // {'bottom': 42, 'left': 81, 'rotation': 0, 'delay': 5.9}
      ]
    });
  }

  render() {
    return (
      <div className="sign-img">
        <div>
          <img alt='Signpist to Scalac img' id='img1' onClick={e => this.proceed(e)} src='../../../assets/img/packYourBag/recruapp_znak_1.png' />
          {this.state.feet.map((foot, idx) => {
            const footSide = (idx % 2) ? 'right' : 'left';
            const imageSrc = '../../../assets/img/packYourBag/' + footSide + '_footprint.svg';
            const imgStyle = {
              bottom: `${foot.bottom}%`,
              left: `${foot.left}%`,
              transform: `rotate(${foot.rotation}deg) scale(${foot.scale})`,
              animation: `footStep 1.5s ease-in-out ${foot.delay}s 1 normal forwards`
            };
            return <img className='footPrint' key={idx} src={imageSrc} style={imgStyle}/>;
          }
          )}
          <ul className="benefits-list" >
            {this.state.benefits.map((item, idx) =>
              <li key={idx}>{item}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
