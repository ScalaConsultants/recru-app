import Component from 'react-pure-render/component';
import React from 'react';
import backpackList from '../data/backpackListItems.json';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./SignpostImg.styl');
}

export default class SignpostImg extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    animate: PropTypes.bool.isRequired,
    benefits: PropTypes.array.isRequired,
    delayBetween: PropTypes.number,
    delayStart: PropTypes.number
  }

  static defaultProps = {
    animate: false,
    delayBetween: 500,
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
        {'bottom': 41, 'left': 17, 'rotation': -360, 'delay': 0.0, 'scale': 0.40},
        {'bottom': 43, 'left': 21, 'rotation': -350, 'delay': 0.3, 'scale': 0.40},

        {'bottom': 49, 'left': 18, 'rotation': -350, 'delay': 0.6, 'scale': 0.45},
        {'bottom': 50, 'left': 22, 'rotation': -340, 'delay': 0.9, 'scale': 0.45},

        {'bottom': 56, 'left': 21, 'rotation': -320, 'delay': 1.2, 'scale': 0.50},
        {'bottom': 55, 'left': 26, 'rotation': -300, 'delay': 1.5, 'scale': 0.55},

        {'bottom': 60, 'left': 27, 'rotation': -300, 'delay': 1.8, 'scale': 0.55},
        {'bottom': 57, 'left': 33, 'rotation': -270, 'delay': 2.1, 'scale': 0.65},

        {'bottom': 61, 'left': 35, 'rotation': -270, 'delay': 2.4, 'scale': 0.65},
        {'bottom': 57, 'left': 41, 'rotation': -270, 'delay': 2.7, 'scale': 0.70},

        {'bottom': 62, 'left': 45, 'rotation': -280, 'delay': 3.0, 'scale': 0.75},
        {'bottom': 58, 'left': 51, 'rotation': -280, 'delay': 3.3, 'scale': 0.75},

        {'bottom': 65, 'left': 55, 'rotation': -300, 'delay': 3.6, 'scale': 0.78},
        {'bottom': 62, 'left': 61, 'rotation': -300, 'delay': 3.9, 'scale': 0.80}
      ]
    });
  }

  render() {
    return (
      <div className="sign-img">
        <div>
          <img alt='Signpost to Scalac img' id='img1' onClick={e => this.proceed(e)} src='../../../assets/img/packYourBag/mountains.svg' />
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
          <ul className="benefits-list" >Scalac&nbsp;vitamins:<br />
            {this.state.benefits.map((item, idx) =>
              <li key={idx}>{item}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
