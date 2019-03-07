import {
  all, call, put, race, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import mime from 'mime-types';
import { electron, filesystem } from './lib';
import actionTypes from './action-types';

function* fileStat(directory, filename) {
  const path = `${directory}/${filename}`;
  const stats = yield call(filesystem.stat, path);
  const contentType = mime.lookup(filename);
  const isDirectory = !stats.isFile();
  const isImage = /image\/*/.test(contentType);
  const isVideo = /video\/*/.test(contentType);
  if (isDirectory || isImage || isVideo) {
    return { filename, isDirectory, isImage, isVideo, path };
  }
}

function* listDirectoryFiles(action) {
  const { path } = action.payload;
  try {
    let dir = yield call(filesystem.readdir, path);
    const visible = dir.filter(file => !(/(^|\/)\.[^\/\.]/g).test(file));
    if (visible) {
      const files = [];
      for (let filename of visible) {
        const file = yield call(fileStat, path, filename);
        if (file) {
          const index = files.length;
          files.push({ ...file, index });
        }
      }
      yield all([
        put({
          type: actionTypes.SET_FILES,
          payload: { files },
        }),
        put({
          type: actionTypes.FIRST_MEDIA_FILE,
        }),
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

function* parentDirectory(action) {
  const { path } = action.payload;
  try {
    const parentPath = yield call(filesystem.parentdir, path);
    if (parentPath) {
      yield put({
        type: actionTypes.CHANGE_DIRECTORY,
        payload: { path: parentPath },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function* setElectronPrefs(action) {
  const { width, height } = yield select(state => state.electron);
  try {
    const currentWindow = electron.getCurrentWindow();
    currentWindow.setSize(width, height);
    currentWindow.show();
    yield put({ type: actionTypes.SET_WINDOW_SIZE_SUCCESS });
  } catch (error) {
    console.error(error);
  }
}

function* firstMediaFile(action) {
  try {
    const files = yield select(state => state.files);
    for (let file of files) {
      if (file.isImage || file.isVideo) {
        yield put({
          type: actionTypes.SET_FILE,
          payload: { file },
        });
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function* randomFile() {
  try {
    const { file, files } = yield select(state => state);
    const nextIndex = Math.floor(Math.random() * files.length);
    if (nextIndex === file.index) {
      yield put({ type: actionTypes.RANDOM_FILE });
    } else {
      const next = files[nextIndex];
      yield put({
        type: actionTypes.SET_FILE,
        payload: { file: next },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function* setNextFile(action) {
  const { direction } = action.payload;
  try {
    const { file, files } = yield select(state => state);
    const { index } = file;
    const next = direction === 'next' ? (
      files[index === files.length - 1 ? 0 : index + 1]
    ) : (
      files[index === 0 ? files.length - 1 : index - 1]
    );
    yield put({
      type: actionTypes.SET_FILE,
      payload: { file: next },
    });
  } catch (error) {
    console.error(error);
  }
}

export default function* () {
  yield all([
    takeLatest(actionTypes.CHANGE_DIRECTORY, listDirectoryFiles,),
    takeLatest(actionTypes.FIRST_MEDIA_FILE, firstMediaFile),
    takeLatest(actionTypes.NEXT_FILE, setNextFile),
    takeLatest(actionTypes.PARENT_DIRECTORY, parentDirectory),
    takeLatest(actionTypes.PERSIST_REHYDRATE, setElectronPrefs),
    takeLatest(actionTypes.RANDOM_FILE, randomFile),
  ]);
}
