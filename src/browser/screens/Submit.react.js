import Component from 'react-pure-render/component';
import classNames from 'classnames';
import boundScroll from '../lib/boundScroll';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Scrollbars} from 'react-custom-scrollbars';

import data from '../data/regulations.json';

if (process.env.IS_BROWSER) {
  require('./Submit.styl');
}

@boundScroll()
class Submit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    candidate: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  };

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
      namePassed: false,
      policyKeyPassed: false
    };
  }

  isDataValid() {
    const {emailPassed, policyKeyPassed, namePassed} = this.state;

    if (this.props.candidate.name) {
      return !!emailPassed && policyKeyPassed;
    }
    return emailPassed && namePassed && policyKeyPassed;
  }

  submit() {
    if (!this.isDataValid()) return;

    const rawCandidate = this.props.candidate.toObject();
    const skills = Object.values(rawCandidate.skills.toObject()).map(item =>
      item.toObject()
    );
    const features = Object.values(
      this.props.candidate.features.toObject()
    ).map(item => item.toObject().desc);
    const exp = this.props.candidate.exp.toObject().position;

    const candidateData = {
      name:
        this.props.candidate.name ||
        ReactDOM.findDOMNode(this.refs.nameInput).value,
      role: rawCandidate.role.position,
      email: ReactDOM.findDOMNode(this.refs.emailInput).value,
      skills: [...skills],
      extraSkills: this.props.candidate.extraSkills,
      features,
      exp
    };

    // Only add linkedin property if we really have cvFile here
    if (this.state.urlPassed)
      candidateData.linkedin = ReactDOM.findDOMNode(this.refs.urlInput).value;

    let parts = {
      jsonData: JSON.stringify(candidateData)
    };

    // Only add cvFile property if we really have cvFile here
    if (this.state.fileUploaded) parts.cvFile = this.cvFile;

    const {
      actions: {submit}
    } = this.props;
    const endpoint =
      this.props.config.apiEndpoint || 'https://recru-app-backend.scalac.io/';
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

  handleChange() {
    const {policyKeyPassed} = this.state;
    this.setState({policyKeyPassed: !policyKeyPassed});
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
    const {policyKeyPassed} = this.state;

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
          <input
            className={emailInputClassName}
            onChange={e => this.handleEmailChange(e)}
            placeholder="email"
            ref="emailInput"
            tabIndex="-1"
            type="email"
          />
        </div>
        {!this.props.candidate.name && (
          <div className="field">
            <h2>and name</h2>
            <input
              className={nameClassName}
              onChange={e => this.nameChange(e)}
              placeholder="name"
              ref="nameInput"
              tabIndex="-1"
              type="text"
            />
          </div>
        )}
        <div className="field">
          <h2>and either a LinkedIn profile URI</h2>
          <input
            className="optional"
            onChange={e => this.handleUrlChange(e)}
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
          id="drop"
          onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()}
          ref="dropArea"
        >
          <span>
            {this.state.fileUploaded
              ? 'resume uploaded'
              : 'drop or click to select resume'}
          </span>
        </div>
        <div className="checkbox-terms">
          <div className="checkbox-list">
            <div className="list-item">
              <input
                id="policy-key"
                onChange={e => this.handleChange('policy-key')}
                type="checkbox"
                value={policyKeyPassed}
              />
              <label htmlFor={'policy-key'}>
                <span>
                  Do You agree to the processing of your personal data by Scalac
                  and accept the{' '}
                  <a href="#terms&conditions">Terms and Conditions</a> and{' '}
                  <a href="#privacy-policy">Privacy Policy</a> of Scalac?
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="overlay" id="terms&conditions">
          <div className="popup">
            <Scrollbars autoHeight autoHeightMin={400}>
              <h2>Terms and Conditions</h2>
              <a className="close" href="#">
                &times;
              </a>
              <div className="content">
                {data.termsConditions.map(terms => (
                  <p key={terms.id}>{terms.desc}</p>
                ))}
              </div>
            </Scrollbars>
          </div>
        </div>
        <div className="overlay" id="privacy-policy">
          <div className="popup">
            <Scrollbars autoHeight autoHeightMin={400}>
              <h2>Privacy Policy</h2>
              <a className="close" href="#">
                &times;
              </a>
              <div className="content">
                <p>{data.privacyPolicy.desc}</p>
              </div>
            </Scrollbars>
          </div>
        </div>
        <button
          className={buttonInputClassName}
          disabled={!this.isDataValid() || candidate.isSubmittingForm}
          onClick={() => this.submit()}
        >
          <i />
          {buttonTitle}
        </button>
      </section>
    );
  }
}

export default Submit;
