const { app, BrowserWindow } = require('electron');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.hide();
  win.loadFile('public/index.html');
  win.on('closed', () => win = null);
  if (process.argv[2] === 'development') {
    win.webContents.openDevTools();
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS).then(console.log, console.error);
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
