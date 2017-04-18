import Component from 'react-pure-render/component';
import classNames from 'classnames';
import boundScroll from '../lib/boundScroll';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

if (process.env.IS_BROWSER) {
  require('./Fifth.styl');
}

const VALID_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text'
];

const MAX_FILE_SIZE_MB = 20;

@boundScroll()
export default class FifthScreen extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.submit = this.submit.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  getDefaultState() {
    return {
      dragOver: false,
      fileUploaded: false,
      urlPassed: false,
      emailPassed: false,
      fileInvalid: false
    };
  }

  isDataValid() {
    if (this.state.emailPassed && (this.state.urlPassed || this.state.fileUploaded))
      return true;
    return false;
  }

  bytesToMegaBytes(bytes) {
    return (bytes / (1000 * 1000));
  }

  submit() {
    if (!this.isDataValid())
      return;

    let candidateData = {
      name: this.props.candidate.name,
      role: this.props.candidate.role.name,
      email: ReactDOM.findDOMNode(this.refs.emailInput).value,
      skills: this.props.candidate.skills.toArray(),
      otherSkill: this.props.candidate.otherSkill
    };

    // Only add linkedin property if we really have cvFile here
    if (this.state.urlPassed) candidateData.linkedin = ReactDOM.findDOMNode(this.refs.urlInput).value;

    let parts = {
      jsonData: JSON.stringify(candidateData)
    };

    // Only add cvFile property if we really have cvFile here
    if (this.state.fileUploaded) parts.cvFile = this.cvFile;

    const {actions: {submit}} = this.props;
    const apiEndpoint = `${this.props.config.apiEndpoint.replace(/\/?$/, '/')}upload`;
    submit(apiEndpoint, parts);
  }

  handleUrlChange(e) {
    const hasNoValue = !e.target.value || e.target.value.trim().length === 0;
    this.setState({urlPassed: !hasNoValue});
  }

  handleEmailChange(e) {
    const hasNoValue = !e.target.value || e.target.value.trim().length === 0;
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    this.setState({emailPassed: !hasNoValue && filter.test(e.target.value)});
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragOver: e.type === 'dragover'});
  }

  handleDrop(e) {
    const files = e.target.files || e.dataTransfer.files;
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    let validMimeType = false;
    let fileMimeType = null;
    let fileSize = 0;

    this.handleDragOver(e);

    if (files.length > 1) {
      window.alert('You can only upload one file.'); // eslint-disable-line no-alert
      return;
    }

    this.cvFile = files[0];
    fileMimeType = this.cvFile.type;
    fileSize = this.bytesToMegaBytes(this.cvFile.size);

    validMimeType = VALID_MIME_TYPES.some((mimeType) => {
      return (fileMimeType === mimeType);
    });

    if (!validMimeType || fileSize > MAX_FILE_SIZE_MB) {
      fileInput.value = '';
      this.setState({fileUploaded: false, fileInvalid: true});
      return;
    }

    this.setState({fileUploaded: true, fileInvalid: false});
  }

  componentDidMount() {
    const dropArea = ReactDOM.findDOMNode(this.refs.dropArea);
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    dropArea.addEventListener('dragover', this.handleDragOver, false);
    dropArea.addEventListener('dragleave', this.handleDragOver, false);
    dropArea.addEventListener('drop', this.handleDrop, false);
    fileInput.addEventListener('change', this.handleDrop, false);
  }

  componentWillUnmount() {
    const dropArea = ReactDOM.findDOMNode(this.refs.dropArea);
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    dropArea.removeEventListener('dragover', this.handleDragOver);
    dropArea.removeEventListener('dragleave', this.handleDragOver);
    dropArea.removeEventListener('drop', this.handleDrop);
    fileInput.removeEventListener('change', this.handleDrop, false);
  }

  render() {
    const {candidate} = this.props;

    const dropAreaclassName = classNames('drop-area', {
      hover: this.state.dragOver,
      active: this.state.fileUploaded
    });

    const inputClassName = classNames({
      active: this.state.urlPassed
    });

    const emailInputClassName = classNames({
      active: this.state.emailPassed
    });

    const inputText = this.state.fileUploaded
      ? 'resume uploaded'
      : 'drop or click to select resume';

    const hintClassNames = classNames('hint', {
      '-error': this.state.fileInvalid
    });

    const buttonInputClassName = classNames({
      '-pending': candidate.isSubmittingForm
    });

    const buttonTitle = candidate.isSubmittingForm
      ? 'Submitting, hold on...'
      : 'Take me to Scalac';

    return (
      <section className="fifth-screen screen dark">
        <header><span>One more thing...</span></header>
        <div className="contactForm">
          <h2>Leave us your email</h2>
          <input className={emailInputClassName} onChange={this.handleEmailChange} placeholder="email" ref="emailInput" tabIndex="-1" type="email"/>
          <h2>and either a LinkedIn profile URI</h2>
          <input className={inputClassName} onChange={this.handleUrlChange} placeholder="linkedin.com/in/username" ref="urlInput" tabIndex="-1" type="url"/>
          <h2>or</h2>
          <input accept=".pdf,.doc,.docx,.odt" ref="fileInput" tabIndex="-1" type="file"/>
          <div className={dropAreaclassName} id="drop" onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()} ref="dropArea">
            <span className="text">{inputText}</span>
            <span className={hintClassNames}>(doc, docx, pdf, max. {MAX_FILE_SIZE_MB}MB)</span>
          </div>
          <button className={buttonInputClassName} disabled={!this.isDataValid() || candidate.isSubmittingForm} onClick={this.submit}><i></i>{buttonTitle}</button>
        </div>
      </section>
    );
  }
}
