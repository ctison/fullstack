import { app, BrowserWindow, Menu, Notification, shell, Tray } from 'electron'
import { release } from 'os'
import { join } from 'path'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | undefined = undefined

async function createWindow(): Promise<void> {
  win = new BrowserWindow({
    title: 'Main window',
    x: 0,
    y: 0,
    width: 900,
    height: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
    },
  })

  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    if (deviceList && deviceList.length > 0) {
      console.log(deviceList)
    }
    callback('')
  })

  if (app.isPackaged) {
    await win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧  Use process.env['VITE_ENV_NAME'] to avoid vite:define plugin
    // eslint-disable-next-line dot-notation
    const url: string = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

    win.webContents.openDevTools()
    await win.loadURL(url)
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

const NOTIFICATION_BODY: string = 'Testing Notification from the Main process'

function showNotification(): void {
  const notification: Notification = new Notification({
    title: 'Shell UI',
    body: NOTIFICATION_BODY,
  })
  notification.show()
}

let tray: Tray

app
  .whenReady()
  .then(createWindow)
  .then(async () => {
    // if (!app.isPackaged) {
    //   try {
    //     const devTools = await import('electron-devtools-installer')
    //     const name = await devTools.default(
    //       [devTools.REACT_DEVELOPER_TOOLS, devTools.REDUX_DEVTOOLS],
    //       {
    //         // loadExtensionOptions: { allowFileAccess: true },
    //         forceDownload: true,
    //       }
    //     )
    //     console.log(`Added Extension: ${name}`)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }

    if (true) {
      const icon = join(__dirname, '../../resources/icon.png')
      tray = new Tray(icon)

      const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', click: () => win?.show() },
        { label: 'Minimize', click: () => win?.minimize() },
        { label: 'Minimize to tray', click: () => win?.hide() },
        { label: 'Test Notifiation', click: () => showNotification() },
        { label: 'seperator', type: 'separator' },
        { label: 'Dev', click: () => win?.webContents.openDevTools() },
        { label: 'seperator', type: 'separator' },
        {
          label: 'Restart Vitron',
          click: () => {
            app.relaunch()
            app.quit()
          },
        },
        { label: 'seperator', type: 'separator' },
        { label: 'Exit', click: () => app.quit() },
      ])
      tray.setToolTip('Vitron by Blade')
      tray.setContextMenu(contextMenu)
      tray.setIgnoreDoubleClickEvents(true)
      tray.on('click', _event => win?.show())
    }
  })

app.on('window-all-closed', () => {
  win = undefined
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0]?.focus()
  } else {
    createWindow()
  }
})
