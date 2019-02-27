import { promisify } from 'util';
import { dirname } from 'path';

const remote = window.require('electron').remote;
const fs = remote.require('fs');

export default {
  homedir: remote.require('os').homedir(),
  parentdir: path => dirname(path),
  readFile: promisify(fs.readFile),
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat),
};
