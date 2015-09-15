import Component from '../components/component.react';
import React from 'react';
import fetch from 'isomorphic-fetch';

import * as screensActions from '../screens/actions';
import * as candidateActions from '../candidate/actions';

const actions = [screensActions, candidateActions];

export default function createActions(BaseComponent) {

  return class CreateActions extends Component {

    static propTypes = {
      flux: React.PropTypes.object.isRequired
    }

    createActions() {
      const {flux} = this.props;
      const state = () => flux.state.toObject();

      return actions.reduce((actions, {create, feature, inject}) => {
        const dispatch = (action, payload) =>
          flux.dispatch(action, payload, {feature});

        const deps = [dispatch, fetch, state];
        const args = inject ? inject(...deps) : deps;
        return {...actions, [feature]: create(...args)};
      }, {});
    }

    componentWillMount() {
      this.actions = this.createActions();
    }

    render() {
      return <BaseComponent {...this.props} actions={this.actions} />;
    }

  };

}
