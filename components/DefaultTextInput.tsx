import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native'

type Props = {
  placeholder: string
  numberOfLines?: number
  multiline?: boolean
  inputMode?: 'text' | 'numeric'
  className?: string
  value: string
  onChange: (e: any) => void
}

const DefaultTextInput: React.FC<Props> = ({
  placeholder,
  numberOfLines,
  multiline,
  inputMode = 'text',
  className,
  value,
  onChange,
}) => {
  return (
    <TextInput
      className={'bg-slate-50 rounded-md flex-1' + className}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      multiline={multiline}
      style={{
        height: (numberOfLines ?? 2) * 24,
        textAlignVertical: multiline ? 'top' : 'center',
        paddingHorizontal: 8,
      }}
      inputMode={inputMode}
      value={value}
      onChangeText={onChange}
    />
  )
}

export default DefaultTextInput
