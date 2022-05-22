import type { V1AdmissionRequest } from '@jspolicy/types'

export default function print(req: V1AdmissionRequest) {
  console.log(req)
}
