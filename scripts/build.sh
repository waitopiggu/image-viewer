#!/usr/bin/env bash

WD=$(pwd)

BUILD_DIR="$WD"/dist
ELECTRON_DIR="$WD"/node_modules/electron/dist
OUTPUT_DIR="$BUILD_DIR"/resources/app
SCRIPTS_DIR="$WD"/scripts

PACKAGE_JSON="$WD"/package.json


if [ ! -d $BUILD_DIR ]; then
  echo copying electron
  cp -Rf  $ELECTRON_DIR $BUILD_DIR
  echo renaming executable
mv -f $BUILD_DIR/electron.exe $BUILD_DIR/image-viewer.exe
fi

echo running webpack
yarn webpack-prod

echo copying files
mkdir -p dist/resources/app
cp -f index.js $OUTPUT_DIR
cp -Rf public/ $OUTPUT_DIR

echo making package.json
node "$SCRIPTS_DIR"/cleanup-package-json $PACKAGE_JSON $OUTPUT_DIR

echo finished
