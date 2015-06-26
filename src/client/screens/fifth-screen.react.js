import Component from '../components/component.react';
import classNames from 'classnames';
import immutable from 'immutable';
import React from 'react';
import './fifth-screen.styl';

class FifthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.proceed = this.proceed.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  getDefaultState() {
    return {
      dragOver: false,
      fileUploaded: false,
      urlPassed: false
    };
  }

  proceed() {
    // TODO: make an XHR request which would send all the data and files to the backend
    //       to get the data use this.props.candidate immutable.js Map
    // TODO: if the XHR request is successful, display thank you overlay
  }

  handleUrlChange(e) {
    const hasNoValue = !e.target.value || e.target.value.trim().length === 0;
    this.setState({urlPassed: !hasNoValue});
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragOver: e.type === 'dragover'});
  }

  handleDrop(e) {
    this.handleDragOver(e);
    this.setState({fileUploaded: true});

    // fetch FileList object
    const files = e.target.files || e.dataTransfer.files;

    // TODO: do something with files, store them somewhere temporarily
  }

  componentDidMount() {
    const dropArea = React.findDOMNode(this.refs.dropArea);
    const fileInput = React.findDOMNode(this.refs.fileInput);
    dropArea.addEventListener('dragover', this.handleDragOver, false);
    dropArea.addEventListener('dragleave', this.handleDragOver, false);
    dropArea.addEventListener('drop', this.handleDrop, false);
    fileInput.addEventListener('change', this.handleDrop, false);
  }

  componentWillUnmount() {
    const dropArea = React.findDOMNode(this.refs.dropArea);
    const fileInput = React.findDOMNode(this.refs.fileInput);
    dropArea.removeEventListener('dragover', this.handleDragOver);
    dropArea.removeEventListener('dragleave', this.handleDragOver);
    dropArea.removeEventListener('drop', this.handleDrop);
    fileInput.removeEventListener('change', this.handleDrop, false);
  }

  render() {
    const dropAreaclassName = classNames('drop-area', {
      hover: this.state.dragOver,
      active: this.state.fileUploaded
    });

    const inputClassName = classNames({
      active: this.state.urlPassed
    });

    return (
      <section className="fifth-screen screen">
        <header>One more thing...</header>
        <h2>Give us your linkedIn...</h2>
        <input className={inputClassName} placeholder="Pass url here" type="text" onChange={this.handleUrlChange}/>
        <span>or</span>
        <input ref="fileInput" type="file" />
        <div className={dropAreaclassName} id="drop" onClick={() => React.findDOMNode(this.refs.fileInput).click()} ref="dropArea">
          <span>drop or click to select resume</span>
        </div>
        <button onClick={this.proceed}><i></i>Get me to the ScalaC</button>
      </section>
    );
  }
}

FifthScreen.propTypes = {
  candidate: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default FifthScreen;
