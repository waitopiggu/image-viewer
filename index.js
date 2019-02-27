const { app, BrowserWindow } = require('electron');

const {
  default: installExtension, REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('public/index.html');
  win.webContents.openDevTools();
  win.on('closed', () => win = null);

  installExtension(REDUX_DEVTOOLS).then(console.log, console.error);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
