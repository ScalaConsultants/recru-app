import Component from '../components/component.react';
import classNames from 'classnames';
import React from 'react';
import './fifth-screen.styl';

export default class FifthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  getDefaultState() {
    return {
      dragOver: false
    };
  }

  handleDragOver() {
    this.setState({dragOver: true});
  }

  handleDragLeave() {
    this.setState({dragOver: false});
  }

  handleDrop() {

  }

  componentDidMount() {
    const dropArea = this.refs.dropArea.getDOMNode();
    dropArea.addEventListener('dragover', this.handleDragOver, false);
    dropArea.addEventListener('dragleave', this.handleDragLeave, false);
    dropArea.addEventListener('drop', this.handleDrop, false);
  }

  componentDidUnmount() {
    const dropArea = this.refs.dropArea.getDOMNode();
    dropArea.removeEventListener('dragover', this.handleDragOver);
    dropArea.removeEventListener('dragleave', this.handleDragLeave);
    dropArea.removeEventListener('drop', this.handleDrop);
  }

  render() {
    const className = classNames('drop-area', {
      hover: this.state.dragOver
    });
    return (
      <section className="fifth-screen screen">
        <header>One more thing...</header>
        <div className={className} id="drop" ref="dropArea">
          <span>drop your resume here</span>
        </div>
      </section>
    );
  }

}
