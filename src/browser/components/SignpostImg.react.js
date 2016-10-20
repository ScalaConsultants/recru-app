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
        {'bottom': 62, 'left': 27, 'rotation': -300, 'delay': 0.0, 'scale': 0.35},
        {'bottom': 57, 'left': 26, 'rotation': -300, 'delay': 0.5, 'scale': 0.35},

        {'bottom': 64, 'left': 35, 'rotation': -270, 'delay': 1.0, 'scale': 0.45},
        {'bottom': 59, 'left': 33, 'rotation': -270, 'delay': 1.5, 'scale': 0.45},

        {'bottom': 64, 'left': 45, 'rotation': -270, 'delay': 2.0, 'scale': 0.55},
        {'bottom': 59, 'left': 43, 'rotation': -270, 'delay': 2.5, 'scale': 0.55},

        {'bottom': 65, 'left': 55, 'rotation': -290, 'delay': 3.0, 'scale': 0.65},
        {'bottom': 59, 'left': 53, 'rotation': -280, 'delay': 3.5, 'scale': 0.65},

        {'bottom': 69, 'left': 63, 'rotation': -310, 'delay': 4.0, 'scale': 0.75},
        {'bottom': 63, 'left': 64, 'rotation': -310, 'delay': 4.5, 'scale': 0.75}




        // {'bottom': 80, 'left': 27, 'rotation': -200, 'delay': 0.0, 'scale': 0.74},
        // {'bottom': 75, 'left': 23, 'rotation': -190, 'delay': 0.5, 'scale': 0.74},
        //
        // {'bottom': 71, 'left': 30, 'rotation': -200, 'delay': 1.0, 'scale': 0.78},
        // {'bottom': 64, 'left': 26, 'rotation': -200, 'delay': 1.5, 'scale': 0.78},
        //
        // {'bottom': 61, 'left': 34, 'rotation': -220, 'delay': 2.0, 'scale': 0.82},
        // {'bottom': 53, 'left': 32, 'rotation': -230, 'delay': 2.5, 'scale': 0.82},
        //
        // {'bottom': 54, 'left': 41, 'rotation': -250, 'delay': 3.0, 'scale': 0.86},
        // {'bottom': 46, 'left': 44, 'rotation': -260, 'delay': 3.5, 'scale': 0.86},
        //
        // {'bottom': 52, 'left': 51, 'rotation': -280, 'delay': 4.0, 'scale': 0.90},
        // {'bottom': 47, 'left': 57, 'rotation': -290, 'delay': 4.5, 'scale': 0.90},
        //
        // {'bottom': 57, 'left': 60, 'rotation': -320, 'delay': 5.0, 'scale': 0.95},
        // {'bottom': 55, 'left': 67, 'rotation': -310, 'delay': 5.5, 'scale': 0.95}
      ]
    });
  }

  render() {
    return (
      <div className="sign-img">
        <div>
          <img alt='Signpist to Scalac img' id='img1' onClick={e => this.proceed(e)} src='../../../assets/img/packYourBag/gory1.svg' />
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
