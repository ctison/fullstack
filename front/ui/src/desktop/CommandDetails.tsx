import { Button, Stack, Switch, TextInput } from '@mantine/core'
import { useState } from 'react'

export interface CommandDetailsProps {
  close: () => void
}

export const CommandDetails: React.FC<CommandDetailsProps> = props => {
  const [name, setName] = useState('')
  const [command, setCommand] = useState('')
  const [sudo, setSudo] = useState(false)
  const [workingDir, setWorkingDir] = useState('')
  const [url, setUrl] = useState('')
  const [notificationWhenFinished, setNotificationWhenFinished] = useState(false)
  return (
    <div className='p-4 w-full'>
      <Stack>
        <h1 className='text-center text-xl'>Add Command</h1>
        <TextInput label='Name' required value={name} onChange={e => setName(e.currentTarget.value)} size='sm' />
        <TextInput label='Command' required value={command} onChange={e => setCommand(e.currentTarget.value)} />
        <Switch label='Sudo' checked={sudo} onChange={e => setSudo(e.currentTarget.checked)} />
        <TextInput label='Working directory' value={workingDir} onChange={e => setWorkingDir(e.currentTarget.value)} />
        <TextInput label='Url' value={url} onChange={e => setUrl(e.currentTarget.value)} />
        <Switch
          label='Notification when finished'
          checked={notificationWhenFinished}
          onChange={e => setNotificationWhenFinished(e.currentTarget.checked)}
        />
        <Button uppercase className='bg-blue-500'>
          OK
        </Button>
        <Button uppercase variant='outline' onClick={props.close}>
          Cancel
        </Button>
      </Stack>
    </div>
  )
}
