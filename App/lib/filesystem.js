import { promisify } from 'util';
import { dirname } from 'path';
import { electron } from '.';

const fs = electron.require('fs');

export default {
  homedir: electron.require('os').homedir(),
  parentdir: path => dirname(path),
  readFile: promisify(fs.readFile),
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat),
};
