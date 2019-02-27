import { connect } from 'react-redux';
import actionTypes from '../../../action-types';
import Video from './Video';

const mapStateToProps = state => ({
  file: state.file,
  files: state.files,
  videoPrefs: state.videoPrefs,
});

const mapDispatchToProps = dispatch => ({
  setFile: file => dispatch({
    type: actionTypes.SET_FILE,
    payload: { file },
  }),
  setVideoPrefs: preferences => dispatch({
    type: actionTypes.SET_VIDEO_PREFS,
    payload: { preferences },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
