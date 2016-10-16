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
    this.setState({feet : [
      {'bottom': 5, 'left': 35, 'rotation': 0, 'delay': 0.5},
      {'bottom': 12, 'left': 43, 'rotation': 20, 'delay': 1.5},
      {'bottom': 30, 'left': 45, 'rotation': 40, 'delay': 2.5},
      {'bottom': 35, 'left': 56, 'rotation': 60, 'delay': 3.5},
      {'bottom': 50, 'left': 60, 'rotation': 70, 'delay': 4.5},
      {'bottom': 50, 'left': 73, 'rotation': 80, 'delay': 5.5}
    ]}
    );
  }

  render() {


    return (
      <div className="screen-img2">
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
    );
  }
}
