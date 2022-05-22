import Document from 'next/document'
import { createGetInitialProps } from '@mantine/next'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-document
 * @see https://mantine.dev/theming/next
 */
export default class _Document extends Document {
  // eslint-disable-next-line @typescript-eslint/typedef
  public static override getInitialProps = createGetInitialProps()
}
