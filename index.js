const { app, BrowserWindow } = require('electron');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 800,
    minWidth: 1024,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('public/index.html');
  win.on('closed', () => win = null);

  if (process.argv[2] === 'development') {
    win.webContents.openDevTools();
    const {
      default: installExtension,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');
    installExtension(REDUX_DEVTOOLS).then(console.log, console.error);
  } else {
    win.setMenu(null);
  }
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
