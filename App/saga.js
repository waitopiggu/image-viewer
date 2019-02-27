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
      for (let index = 0; index < visible.length; index++) {
        const file = yield call(fileStat, path, visible[index]);
        if (file) files.push({ ...file, index });
      }
      yield put({
        type: actionTypes.SET_FILES,
        payload: { files },
      });
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
