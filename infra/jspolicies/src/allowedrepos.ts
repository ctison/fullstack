import type { V1AdmissionRequest } from '@jspolicy/types'

export default function allowedRepos(
  req: V1AdmissionRequest,
  ...repos: string[]
) {}
