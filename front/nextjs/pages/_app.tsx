import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
