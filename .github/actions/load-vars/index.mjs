import core from '@actions/core'
import { context } from '@actions/github'

// Start with an empty vars
/** @type {Record<string, string>} */
const vars = {}

/**
 * Parse variables from the given string in .env format and add them to vars
 * @param {string} body
 */
function parseVars(body) {
  body.split('\n').forEach((line) => {
    const match = line.match(/^(.+?)=(.*)$/)
    if (match && match[1]) {
      vars[match[1]] = match[2] ?? ''
    }
  })
}

// Load variables from various sources
if (context.eventName === 'push') {
  const payload = /** @type {import('@octokit/webhooks-types').PushEvent} */ (
    context.payload
  )
  parseVars(payload.head_commit?.message ?? '')
} else if (context.eventName === 'pull_request') {
  parseVars(context.payload.pull_request?.body ?? '')
}
parseVars(core.getInput('vars'))

// Export everything as output
for (const [k, v] of Object.entries(vars)) {
  core.setOutput(k, v)
}
