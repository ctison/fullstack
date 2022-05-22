import { type InlineProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation'
import * as k8s from '@pulumi/kubernetes'

const pulumiProgram = async () => {
  new k8s.helm.v3.Release('vault', {
    chart: 'vault',
    repositoryOpts: {
      repo: 'https://helm.releases.hashicorp.com',
    },
    version: '0.19.0',
    createNamespace: true,
  })
  return {}
}

const args: InlineProgramArgs = {
  stackName: 'dev',
  projectName: 'inlineNode',
  program: pulumiProgram,
}

const stack = await LocalWorkspace.createOrSelectStack(args)

await stack.workspace.installPlugin('aws', 'v4.0.0')
await stack.setConfig('aws:region', { value: 'us-west-2' })

const upRes = await stack.up({ onOutput: console.info })

console.log(upRes)
