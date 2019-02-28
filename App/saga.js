import { all, call, put, race, takeLatest } from 'redux-saga/effects';
import mime from 'mime-types';
import { filesystem } from './lib';
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

function* listDirectory(action) {
  const { path } = action.payload;
  try {
    let dir = yield call(filesystem.readdir, path);
    const visible = dir.filter(file => !(/(^|\/)\.[^\/\.]/g).test(file));
    if (dir && visible) {
      const files = [];
      let firstMediaIndex = -1;
      for (let filename of visible) {
        const file = yield call(fileStat, path, filename);
        if (file) {
          const index = files.length;
          files.push({ ...file, index });
          if (firstMediaIndex < 0 && (file.isImage || file.isVideo)) {
            firstMediaIndex = index;
          }
        }
      }
      yield put({
        type: actionTypes.SET_FILES,
        payload: { files },
      });
      if (firstMediaIndex >= 0) {
        yield put({
          type: actionTypes.SET_FILE,
          payload: { file: files[firstMediaIndex] },
        });
      }
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
      yield all([
        put({
          type: actionTypes.CHANGE_DIRECTORY,
          payload: { path: parentPath },
        }),
        put({
          type: actionTypes.SET_FILE,
          payload: { file: {} },
        }),
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* () {
  yield all([
    takeLatest(
      [actionTypes.CHANGE_DIRECTORY, actionTypes.LIST_DIRECTORY],
      listDirectory,
    ),
    takeLatest(actionTypes.PARENT_DIRECTORY, parentDirectory),
  ]);
}
