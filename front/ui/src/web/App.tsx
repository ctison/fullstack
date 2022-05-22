import { AppShell, Navbar, Header, MantineProvider } from '@mantine/core'
import type { FC } from 'react'
import { BaseConverter } from '../components/base-converter/BaseConverter'

export const App: FC = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <AppShell
        padding='md'
        navbar={
          <Navbar width={{ base: 300 }} height={500} p='xs'>
            Shui
          </Navbar>
        }
        header={
          <Header height={60} p='xs'>
            Shui
          </Header>
        }
        styles={() => ({
          main: {
            backgroundColor: 'white',
          },
        })}
      >
        <h1>Hello</h1>
        <BaseConverter />
      </AppShell>
    </MantineProvider>
  )
}
