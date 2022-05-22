import { Box, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'

export interface BaseConverterProps {}

export const BaseConverter: React.FC<BaseConverterProps> = () => {
  const form = useForm({
    initialValues: {
      number: '',
      fromBase: '',
      toBase: '',
    },
    validationRules: {
      fromBase: (value) => true,
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    console.log(values)
  })

  return (
    <Box>
      <h1>Base Converter</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label='Number'
          placeholder='51966'
          {...form.getInputProps('number')}
        />
        <TextInput
          required
          label='From Base'
          placeholder='0123456789'
          {...form.getInputProps('fromBase')}
        />
        <TextInput
          required
          label='To Base'
          placeholder='0123456789ABCDEF'
          {...form.getInputProps('toBase')}
        />
        <Button type='submit' mt={16}>
          Convert
        </Button>
      </form>
    </Box>
  )
}
