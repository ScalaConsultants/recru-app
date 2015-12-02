import * as candidateActions from '../candidate/actions';
import * as screensActions from '../screens/actions';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

const actions = [
  candidateActions,
  screensActions
];

export default function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
