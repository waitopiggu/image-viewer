import { connect } from 'react-redux';
import actionTypes from '../../action-types';
import Browser from './Browser';

const mapStateToProps = state => ({
  directory: state.directory,
  files: state.files,
});

const mapDispatchToProps = dispatch => ({
  changeDirectory: path => dispatch({
    type: actionTypes.CHANGE_DIRECTORY,
    payload: { path },
  }),
  parentDirectory: path => dispatch({
    type: actionTypes.PARENT_DIRECTORY,
    payload: { path },
  }),
  setFile: file => dispatch({
    type: actionTypes.SET_FILE,
    payload: { file },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
