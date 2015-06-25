import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './fifth-screen.styl';

export default class FifthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  getDefaultState() {
    return {
      dragOver: false
    };
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragOver: e.type === 'dragover'});
  }

  handleDrop(e) {
    this.handleDragOver(e);

    // fetch FileList object
    const files = e.target.files || e.dataTransfer.files;

    // process all File objects
    for (let i = 0, f; f = files[i]; i++) {
      // f.name, f.type, f.size
      console.log(f.name);
    }
  }

  componentDidMount() {
    const dropArea = this.refs.dropArea.getDOMNode();
    const fileInput = this.refs.fileInput.getDOMNode();
    dropArea.addEventListener('dragover', this.handleDragOver, false);
    dropArea.addEventListener('dragleave', this.handleDragOver, false);
    dropArea.addEventListener('drop', this.handleDrop, false);
    fileInput.addEventListener('change', this.handleDrop, false);
  }

  componentDidUnmount() {
    const dropArea = this.refs.dropArea.getDOMNode();
    const fileInput = this.refs.fileInput.getDOMNode();
    dropArea.removeEventListener('dragover', this.handleDragOver);
    dropArea.removeEventListener('dragleave', this.handleDragOver);
    dropArea.removeEventListener('drop', this.handleDrop);
    fileInput.removeEventListener('change', this.handleDrop, false);
  }

  render() {
    const className = classNames('drop-area', {
      hover: this.state.dragOver
    });

    return (
      <section className="fifth-screen screen">
        <header>One more thing...</header>
        <h2>Give us your linkedIn profile adress</h2>
        <input type="text" value="Pass here url" />
        <span>or</span>
        <input ref="fileInput" type="file"/>
        <div className={className} id="drop" onClick={() => this.refs.fileInput.getDOMNode().click()} ref="dropArea">
          <span>drop or click to select resume</span>
        </div>
      </section>
    );
  }

}
