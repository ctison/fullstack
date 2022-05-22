import { spawn } from 'child_process'
import { createServer, build } from 'vite'

console.log(import.meta.url)

const query = new URLSearchParams(import.meta.url.split('?')[1])
const debug = query.has('debug')

/** @param {import('vite').ViteDevServer} server */
function watchMain(server) {
  const address = server.httpServer?.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST:
      typeof address === 'string' ? address : address?.address,
    VITE_DEV_SERVER_PORT: typeof address === 'string' ? address : address?.port,
  })

  /** @type {import('child_process').ChildProcess | undefined} */
  let electronProcess

  /** @type {import('vite').Plugin} */
  const startElectron = {
    name: 'electron-main-watcher',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn('electron', ['.'], { stdio: 'inherit', env })
    },
  }

  return build({
    configFile: 'src/main/vite.config.ts',
    mode: 'development',
    plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: {},
    },
  })
}

/** @param {import('vite').ViteDevServer} server */
function watchPreload(server) {
  return build({
    configFile: 'src/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        },
      },
    ],
    build: {
      watch: {},
    },
  })
}

async function main() {
  const server = await createServer()
  await server.listen()
  await watchPreload(server)
  await watchMain(server)
  server.printUrls()
}

main()
