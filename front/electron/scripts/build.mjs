import { build } from 'vite'

async function main() {
  await build({ configFile: 'src/main/vite.config.ts' })
  await build({ configFile: 'src/preload/vite.config.ts' })
  await build({})
}

main()
