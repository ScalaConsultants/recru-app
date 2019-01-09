import Component from 'react-pure-render/component';
import classNames from 'classnames';
import boundScroll from '../lib/boundScroll';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

if (process.env.IS_BROWSER) {
  require('./Submit.styl');
}

@boundScroll()
class Submit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
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
      return !!this.state.emailPassed;
    }
    return this.state.emailPassed && this.state.namePassed;
  }

  submit() {
    if (!this.isDataValid())
      return;

    const rawCandidate = this.props.candidate.toObject();
    const skills = Object.values(rawCandidate.skills.toObject()).map(item => item.toObject());
    const features = Object.values(
      this.props.candidate.features.toObject()).map(item => item.toObject().desc);
    const exp = this.props.candidate.exp.toObject().position;

    const candidateData = {
      name: this.props.candidate.name || ReactDOM.findDOMNode(this.refs.nameInput).value,
      role: rawCandidate.role.position,
      email: ReactDOM.findDOMNode(this.refs.emailInput).value,
      skills: [...skills],
      extraSkills: this.props.candidate.extraSkills,
      features,
      exp,
      consentRecruitment: rawCandidate.rodoPermissions,
      consentInformationClause: rawCandidate.rodoPermissions
    };

    // Only add linkedin property if we really have cvFile here
    if (this.state.urlPassed) candidateData.linkedin = ReactDOM.findDOMNode(this.refs.urlInput).value;

    let parts = {
      jsonData: JSON.stringify(candidateData)
    };

    // Only add cvFile property if we really have cvFile here
    if (this.state.fileUploaded) parts.cvFile = this.cvFile;

    const {actions: {submit}} = this.props;
    const endpoint = this.props.config.apiEndpoint || 'https://recru-app-backend.scalac.io/';
    const apiEndpoint = `${endpoint.replace(/\/?$/, '/')}upload`;

    submit(apiEndpoint, parts);
  }

  handleUrlChange(e) {
    const hasNoValue = e.target.value.trim().length === 0;
    this.setState({urlPassed: !hasNoValue});
  }

  nameChange(e) {
    const hasNoValue = e.target.value.trim().length === 0;
    this.setState({namePassed: !hasNoValue});
  }

  handleEmailChange(e) {
    const hasNoValue = e.target.value.trim().length === 0;
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
      : 'Take me to Scalac';

    return (
      <section className="submit screen dark">
        <header>One more thing...</header>
        <div className="field">
          <h2>Leave us your email</h2>
          <input className={emailInputClassName}
            onChange={(e) => this.handleEmailChange(e)}
            placeholder="email"
            ref="emailInput"
            tabIndex="-1"
            type="email"/>
        </div>
        { !this.props.candidate.name &&
          <div className="field">
            <h2>and name</h2>
            <input
              className={nameClassName}
              onChange={(e) => this.nameChange(e)}
              placeholder="name"
              ref="nameInput"
              tabIndex="-1"
              type="text"/>
          </div>
        }
        <div className="field">
          <h2>and either a LinkedIn profile URI</h2>
          <input
            className="optional"
            onChange={(e) => this.handleUrlChange(e)}
            placeholder="linkedin.com/in/username"
            ref="urlInput"
            tabIndex="-1"
            type="url"
          />
        </div>
        <span>or</span>
        <input ref="fileInput" tabIndex="-1" type="file" />
        <div
          className={dropAreaclassName}
          id="drop" onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()}
          ref="dropArea"
        >
          <span>
            { this.state.fileUploaded ? 'resume uploaded' : 'drop or click to select resume'}
          </span>
        </div>
        <button
          className={buttonInputClassName}
          disabled={!this.isDataValid() || candidate.isSubmittingForm}
          onClick={() => this.submit()}
        >
          <i />{buttonTitle}
        </button>
      </section>
    );
  }
}

export default Submit;
