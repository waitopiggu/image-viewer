import { connect } from 'react-redux';
import actionTypes from '../../../action-types';
import Image from './Image';

const mapStateToProps = state => ({
  file: state.file,
});

const mapDispatchToProps = dispatch => ({
  nextFile: direction => dispatch({
    type: actionTypes.NEXT_FILE,
    payload: { direction },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
