import Component from '../../client/components/component.react';
import React from 'react';

export default class Html extends Component {

  render() {
    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = this.props.isProduction &&
      <link
        href={`build/app.css?v=${this.props.version}`}
        rel="stylesheet"
      />;

    // TODO: Refactor the ugly way to define environment specific base href
    const baseHref = this.props.isProduction ? '/recru-app/' : '/';

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{this.props.title}</title>
          {linkStyles}
          <link href="assets/img/favicon.ico" rel="shortcut icon"/>
          <base href={baseHref}/>
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} />
      </html>
    );
  }

}

Html.propTypes = {
  bodyHtml: React.PropTypes.string.isRequired,
  isProduction: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  version: React.PropTypes.string.isRequired
};
