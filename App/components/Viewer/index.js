import { connect } from 'react-redux';
import actionTypes from '../../action-types';
import Viewer from './Viewer';

const mapStateToProps = state => ({
  file: state.file,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
