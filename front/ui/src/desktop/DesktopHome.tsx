import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { VscAdd as IconPlus } from 'react-icons/vsc'
import { CommandDetails } from './CommandDetails'

export const DesktopHome: React.FC = () => {
  const [opened, handlers] = useDisclosure(false)
  const choseBluetoothDevice = async () => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    })
    console.log(device)
  }
  return (
    <div className='flex flex-col h-screen'>
      <div className='h-[42px] flex-shrink-0  bg-zinc-700 w-full flex'>
        <button
          className='text-gray-400 px-4 hover:text-blue-400'
          disabled={opened}
          onClick={() => {
            handlers.open()
          }}
        >
          <IconPlus />
        </button>
      </div>
      <div className='flex-grow items-stretch flex'>
        <div className='w-[300px] bg-zinc-500 flex flex-col'></div>
        {opened && <CommandDetails close={handlers.close} />}
      </div>
      <Button onClick={choseBluetoothDevice}>Select Bluetooth</Button>
    </div>
  )
}
