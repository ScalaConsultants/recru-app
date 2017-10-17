import Component from 'react-pure-render/component';
import classNames from 'classnames';
import boundScroll from '../lib/boundScroll';
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.IS_BROWSER) {
  require('./Submit.styl');
}

@boundScroll()
export default class Submit extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.submit = this.submit.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
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
      namePassed: false
    };
  }

  isDataValid() {
    if (this.props.candidate.name) {
      if (this.state.emailPassed && (this.state.urlPassed || this.state.fileUploaded))
        return true;
      return false;
    } else {
      if (this.state.emailPassed && this.state.namePassed && (this.state.urlPassed || this.state.fileUploaded))
        return true;
      return false;
    }
  }

  submit() {
    if (!this.isDataValid())
      return;

    let candidateData = {
      name: this.props.candidate.name || ReactDOM.findDOMNode(this.refs.nameInput).value,
      role: this.props.candidate.role.name,
      email: ReactDOM.findDOMNode(this.refs.emailInput).value,
      skills: this.props.candidate.skills,
      features: this.props.candidate.features,
      exp: this.props.candidate.exp
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

  nameChange(e) {
    const hasNoValue = !e.target.value || e.target.value.trim().length === 0;
    this.setState({namePassed: !hasNoValue});
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
    this.handleDragOver(e);

    if (files.length > 1) {
      window.alert('You can only upload one file.'); // eslint-disable-line no-alert
      return;
    }

    this.cvFile = files[0];
    this.setState({fileUploaded: true});
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

    const nameClassName = classNames({
      active: this.state.namePassed
    });

    const emailInputClassName = classNames({
      active: this.state.emailPassed
    });

    const buttonInputClassName = classNames({
      '-pending': candidate.isSubmittingForm
    });

    const buttonTitle = candidate.isSubmittingForm
      ? 'Submitting, hold on...'
      : 'Take me to ScalaC';

    return (
      <section className="submit screen dark">
        <header>One more thing...</header>
        <h2>Leave us your email</h2>
        <input className={emailInputClassName} onChange={this.handleEmailChange} placeholder="email" ref="emailInput" tabIndex="-1" type="email"/>
        { !this.props.candidate.name &&
          <div>
            <h2>and name</h2>
            <input className={nameClassName} onChange={this.nameChange} placeholder="name" ref="nameInput" tabIndex="-1" type="text"/>
          </div>
        }
        <h2>and either a LinkedIn profile URI</h2>
        <input className={inputClassName} onChange={this.handleUrlChange} placeholder="linkedin.com/in/username" ref="urlInput" tabIndex="-1" type="url"/>
        <span>or</span>
        <input ref="fileInput" tabIndex="-1" type="file" />
        <div className={dropAreaclassName} id="drop" onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()} ref="dropArea">
          <span>
            { this.state.fileUploaded ? 'resume uploaded' : 'drop or click to select resume'}
          </span>
        </div>
        <button className={buttonInputClassName} disabled={!this.isDataValid() || candidate.isSubmittingForm} onClick={this.submit}><i></i>{buttonTitle}</button>
      </section>
    );
  }
}
