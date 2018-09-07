import React from 'react';
import Component from 'react-pure-render/component';

import ScreenImage from '../components/ScreenImage.react';
import boundScroll from '../lib/boundScroll';
import ChevronIcon from '../components/ChevronIcon.react';
import rodoData from '../data/rodo.json';
import AlertCustom from "../components/AlertCustom.react";

if (process.env.IS_BROWSER) {
  require('./Rodo.styl');
}

@boundScroll()
export default class Rodo extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    candidate: React.PropTypes.object.isRequired
  }

  state = {
    permission1: false,
    permission2: false,
    select: false
  }

  proceed() {
    const {actions: {nextScreen}} = this.props
    if (this.checkPermissionGranted()) nextScreen()
  }

  checkPermissionGranted() {
    const {permission1, permission2} = this.state

    if (!(permission1 && permission2)) {
      this.setState({select: true})

      setTimeout(() => {
        this.setState({select: false})
      }, 5000)

      return false
    }
    else return true
  }

  handleChange(rodoItem) {
    const {actions: {saveRodo}} = this.props
    const {permission1, permission2} = this.state

    let perm1 = permission1
    let perm2  = permission2
    if (rodoItem === 1) perm1 = !perm1
    else if (rodoItem === 2) perm2 = !perm2

    this.setState({permission1: perm1})
    this.setState({permission2: perm2})

    let validate = perm1 && perm2

    saveRodo(validate)
  }

  render() {
    const data = rodoData || [];
    const backpackUrl = {
      img: '../../../assets/img/rodo.png'
    };

    const rodoInformationUrl = '../../../assets/docs/information_clause.pdf'

    return (
      <section className="rodo-screen screen">
        <div className="container">
          <ScreenImage data={backpackUrl} />
          <div className="right">
            {<AlertCustom select={this.state.select} desc={"We need both permissions to proceed"}/>}
            <div className="content">
              <div className="screen-content">
                <h1 className="heading-1">{data.title}</h1>
                <div className="header">{data.header}</div>
                <div className="rodo-list">
                  {
                    data.permissions &&
                    data.permissions.map(item =>
                      <div className="list-item" key={item.id}>
                        <input
                          type="checkbox"
                          id={`rodo${item.id}`}
                          value={item.id}
                          onChange={(e) => this.handleChange(item.id)}
                        />
                        <label htmlFor={`rodo${item.id}`}>
                          {item.title} {item.value}
                        </label>
                      </div>
                    )
                  }
                </div>
                <div className="information-clause"><a href={rodoInformationUrl} target='_blank'>Information clause  - click here to read</a></div>
                <div className="footer">{data.footer}</div>

              </div>
              </div>
            <ChevronIcon isAnimated onClick={e => this.proceed(e)}/>
          </div>
        </div>
      </section>
    );
  }
}
