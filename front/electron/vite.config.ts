import { join } from 'path'
import { builtinModules } from 'module'
import pkg from './package.json'
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import optimizer from 'vite-plugin-optimizer'
import tsConfigPaths from 'vite-tsconfig-paths'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react(), tsConfigPaths(), resolveElectron()],
  base: './',
  root: join(__dirname, 'src', 'renderer'),
  build: {
    sourcemap: true,
    outDir: '../../dist/renderer',
    emptyOutDir: true,
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function resolveElectron(
  entries: Parameters<typeof optimizer>[0] = {}
): Plugin {
  const builtins: string[] = builtinModules.filter((t) => !t.startsWith('_'))

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
   */
  return optimizer({
    electron: electronExport(),
    ...builtinModulesExport(builtins),
    ...entries,
  })

  function electronExport(): string {
    return `
/**
 * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
 */
const electron = require("electron");
const {
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
} = electron;

export {
  electron as default,
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
}
`
  }

  /* eslint-disable @typescript-eslint/typedef */
  function builtinModulesExport(modules: string[]): Record<string, string> {
    return modules
      .map((moduleId) => {
        const nodeModule: NodeRequire = require(moduleId)
        const requireModule = `const M = require("${moduleId}");`
        const exportDefault = `export default M;`
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';'
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
`

        return { [moduleId]: nodeModuleCode }
      })
      .reduce((memo, item) => Object.assign(memo, item), {})
  }
  /* eslint-enable @typescript-eslint/typedef */
}
