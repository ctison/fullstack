import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'

import '@shui/ui/style.css'

createRoot(document.getElementById('root')!, {}).render(
  <StrictMode>
    <App />
  </StrictMode>
)

window.removeLoading()

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})
