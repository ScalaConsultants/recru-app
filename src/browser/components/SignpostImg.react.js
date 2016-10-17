import Component from 'react-pure-render/component';
import React from 'react';

if (process.env.IS_BROWSER) {
  require('./SignpostImg.styl');
}

export default class SignpostImg extends Component {
  static propTypes = {
    animate: React.PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      animate: false,
      feet: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate === this.props.animate) {
      return;
    }

    if (nextProps.animate) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(this.pushItems.bind(this));
    }
  }

  pushItems() {
    this.setState({
      feet: [
        {'bottom': 15, 'left': 3, 'rotation': 90, 'delay': 0.2},
        {'bottom': 5, 'left': 8, 'rotation': 90, 'delay': 0.5},
        {'bottom': 15, 'left': 13, 'rotation': 90, 'delay': 0.8},
        {'bottom': 5, 'left': 18, 'rotation': 90, 'delay': 1.1},
        {'bottom': 15, 'left': 23, 'rotation': 90, 'delay': 1.4},
        {'bottom': 5, 'left': 28, 'rotation': 90, 'delay': 1.7},
        {'bottom': 15, 'left': 33, 'rotation': 90, 'delay': 2.0},
        {'bottom': 5, 'left': 38, 'rotation': 90, 'delay': 2.3},
        {'bottom': 15, 'left': 43, 'rotation': 90, 'delay': 2.6},
        {'bottom': 5, 'left': 48, 'rotation': 90, 'delay': 2.9},
        {'bottom': 15, 'left': 53, 'rotation': 90, 'delay': 3.2},
        {'bottom': 5, 'left': 58, 'rotation': 90, 'delay': 3.5},
        {'bottom': 15, 'left': 63, 'rotation': 90, 'delay': 3.8},
        {'bottom': 5, 'left': 68, 'rotation': 90, 'delay': 4.1},
        {'bottom': 19, 'left': 73, 'rotation': 66, 'delay': 4.4},
        {'bottom': 10, 'left': 80, 'rotation': 60, 'delay': 4.7},
        {'bottom': 31, 'left': 81, 'rotation': 27, 'delay': 5.0},
        {'bottom': 25, 'left': 88, 'rotation': 37, 'delay': 5.3},
        {'bottom': 47, 'left': 83, 'rotation': 0, 'delay': 5.6},
        {'bottom': 42, 'left': 91, 'rotation': 0, 'delay': 5.9}

        // {'bottom': 15, 'left': 3, 'rotation': 90, 'delay': 0.5},
        // {'bottom': 5, 'left': 8, 'rotation': 90, 'delay': 1.0},
        // {'bottom': 15, 'left': 13, 'rotation': 90, 'delay': 1.5},
        // {'bottom': 5, 'left': 18, 'rotation': 90, 'delay': 2.5},
        // {'bottom': 15, 'left': 23, 'rotation': 90, 'delay': 3.0},
        // {'bottom': 5, 'left': 28, 'rotation': 90, 'delay': 3.5},
        // {'bottom': 15, 'left': 33, 'rotation': 90, 'delay': 4.0},
        // {'bottom': 5, 'left': 38, 'rotation': 90, 'delay': 4.5},
        // {'bottom': 15, 'left': 43, 'rotation': 90, 'delay': 5.0},
        // {'bottom': 5, 'left': 48, 'rotation': 90, 'delay': 5.5},
        // {'bottom': 15, 'left': 53, 'rotation': 90, 'delay': 6.0},
        // {'bottom': 5, 'left': 58, 'rotation': 90, 'delay': 6.5},
        // {'bottom': 15, 'left': 63, 'rotation': 90, 'delay': 7.0},
        // {'bottom': 5, 'left': 68, 'rotation': 90, 'delay': 7.5},
        // {'bottom': 19, 'left': 73, 'rotation': 66, 'delay': 8.0},
        // {'bottom': 10, 'left': 80, 'rotation': 60, 'delay': 8.5},
        // {'bottom': 31, 'left': 81, 'rotation': 27, 'delay': 9.0},
        // {'bottom': 25, 'left': 88, 'rotation': 37, 'delay': 9.5},
        // {'bottom': 47, 'left': 83, 'rotation': 0, 'delay': 10.0},
        // {'bottom': 42, 'left': 91, 'rotation': 0, 'delay': 10.5},
      ]
    });
  }

  render() {


    return (
      <div className="sign-img">
        <div>
          <a href='https://scalac.io/' target="_blank">
            <img alt='Signpist to Scalac img' id='img1' src='../../../assets/img/packYourBag/recruapp_znak_1.png'/>
          </a>
          {this.state.feet.map((foot, idx) => {
            const footSide = (idx % 2) ? 'right' : 'left';
            const imageSrc = '../../../assets/img/packYourBag/' + footSide + '_footprint.svg';

            const imgStyle = {
              bottom: `${foot.bottom}%`,
              left: `${foot.left}%`,
              transform: `rotate(${foot.rotation}deg)`,
              animation: `footStep 1.5s ease-in-out ${foot.delay}s 1 normal forwards`
            };
            return <img className='footPrint' key={idx} src={imageSrc} style={imgStyle}/>;
          }
          )}
        </div>
      </div>
    );
  }
}
