import { connect } from 'react-redux';
import actionTypes from '../../action-types';
import AppBar from './AppBar';

const mapStateToProps = state => ({
  directory: state.directory,
  file: state.file,
});

const mapDispatchToProps = dispatch => ({
  changeDirectory: path => dispatch({
    type: actionTypes.CHANGE_DIRECTORY,
    payload: { path },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
