import { combineReducers } from 'redux';
import actionTypes from './action-types';
import { filesystem } from './lib';

function file(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_FILE: {
      const { file } = action.payload;
      return file;
    }
    default: {
      return state;
    }
  }
} 

function files(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_FILES: {
      const { files } = action.payload;
      return [...files];
    }
    default: {
      return state;
    }
  }
}

function directory(state = filesystem.homedir, action) {
  switch (action.type) {
    case actionTypes.CHANGE_DIRECTORY: {
      const { path } = action.payload;
      return path;
    }
    default: {
      return state;
    }
  }
}

const videoPrefsInitialState = {
  autoplay: false,
  playbackRate: 1,
  playDir: false,
  loop: false,
  muted: false,
  volume: 0,
};

function videoPrefs(state = videoPrefsInitialState, action) {
  switch (action.type) {
    case actionTypes.SET_VIDEO_PREFS: {
      const { preferences } = action.payload;
      return { ...state, ...preferences };
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  file,
  files,
  directory,
  videoPrefs,
});
