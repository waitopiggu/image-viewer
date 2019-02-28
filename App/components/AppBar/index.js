import { connect } from 'react-redux';
import actionTypes from '../../action-types';
import AppBar from './AppBar';

const mapStateToProps = state => ({
  directory: state.directory,
  file: state.file,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
