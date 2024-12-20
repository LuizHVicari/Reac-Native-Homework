import React from 'react'
import { RadioButton } from 'react-native-paper'
import colors from 'tailwindcss/colors'

type Props = {
  value: string
  onPress: () => void
  status: 'checked' | 'unchecked'
}

const DefaultRadioButton: React.FC<Props> = ({ value, status, onPress }) => {
  return (
    <RadioButton
      value={value}
      status={status}
      onPress={onPress}
      uncheckedColor={colors.slate[600]}
      color={colors.slate[50]}
    />
  )
}

export default DefaultRadioButton
