import { connect } from 'react-redux';
import actionTypes from '../../../action-types';
import Image from './Image';

const mapStateToProps = state => ({
  file: state.file,
  imagePrefs: state.imagePrefs,
});

const mapDispatchToProps = dispatch => ({
  nextFile: direction => dispatch({
    type: actionTypes.NEXT_FILE,
    payload: { direction },
  }),
  setImagePrefs: preferences => dispatch({
    type: actionTypes.SET_IMAGE_PREFS,
    payload: { preferences },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
