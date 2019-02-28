import { connect } from 'react-redux';
import actionTypes from '../../../action-types';
import Video from './Video';

const mapStateToProps = state => ({
  file: state.file,
  videoPrefs: state.videoPrefs,
});

const mapDispatchToProps = dispatch => ({
  nextFile: direction => dispatch({
    type: actionTypes.NEXT_FILE,
    payload: { direction },
  }),
  setVideoPrefs: preferences => dispatch({
    type: actionTypes.SET_VIDEO_PREFS,
    payload: { preferences },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
