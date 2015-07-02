import Component from '../components/component.react';
import {submit} from '../candidate/actions';
import classNames from 'classnames';
import immutable from 'immutable';
import React from 'react';
import './fifth-screen.styl';

class FifthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.submit = this.submit.bind(this);
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

  isDataValid() {
    if (!this.state.urlPassed || !this.state.fileUploaded)
      return false;
    return true;
  }

  submit() {
    if (!this.isDataValid())
      return;

    const candidateData = {
      name: this.props.candidate.get('name'),
      role: this.props.candidate.getIn(['role', 'name']),
      linkedin: React.findDOMNode(this.refs.urlInput).value,
      email: this.props.candidate.get('email'),
      skills: this.props.candidate.get('skills').toList().toJS()
    };

    const parts = {
      cvFile: this.cvFile,
      jsonData: JSON.stringify(candidateData)
    };

    submit(parts);
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
    const files = e.target.files || e.dataTransfer.files;
    this.handleDragOver(e);

    if (files.length > 1) {
      window.alert('You can only upload one file.'); // eslint-disable-line no-alert
      return;
    }

    this.cvFile = files[0];
    this.setState({fileUploaded: true});
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
        <h2>Leave us contact to you</h2>
        <input className="email" placeholder="email" ref="emailInput" type="text"/>
        <h2>...and more info</h2>
        <input className={inputClassName} onChange={this.handleUrlChange} placeholder="Pass url here" ref="urlInput" type="text"/>
        <span>or</span>
        <input ref="fileInput" type="file" />
        <div className={dropAreaclassName} id="drop" onClick={() => React.findDOMNode(this.refs.fileInput).click()} ref="dropArea">
          <span>
            { this.state.fileUploaded ? 'resume uploaded' : 'drop or click to select resume'}
          </span>
        </div>
        <button disabled={!this.isDataValid()} onClick={this.submit}><i></i>Take me to ScalaC</button>
      </section>
    );
  }
}

FifthScreen.propTypes = {
  candidate: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default FifthScreen;
