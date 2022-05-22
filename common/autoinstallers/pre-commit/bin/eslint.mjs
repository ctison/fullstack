import { RushConfiguration } from '@microsoft/rush-lib'
import { execSync } from 'child_process'

const rushConfiguration = RushConfiguration.loadFromDefaultLocation()

const projectsPaths = rushConfiguration.projects.map(
  (projectConfiguration) => projectConfiguration.projectFolder
)

try {
  process.argv.splice(2).forEach((v) => {
    for (const path of projectsPaths) {
      if (v.startsWith(path)) {
        execSync(`rushx eslint ${v.slice(path.length)}`, {
          cwd: path,
          stdio: 'inherit',
        })
        break
      }
    }
  })
} catch {
  process.exit(1)
}
