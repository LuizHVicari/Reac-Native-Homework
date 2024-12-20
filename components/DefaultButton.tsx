import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

type Props = {
  onPress: () => void
  text: string
  type?: 'success' | 'warning'
}

const DefaultButton: React.FC<Props> = ({ onPress, text, type }) => {
  return (
    <TouchableOpacity
      className={`flex-row justify-center items-center  p-2 rounded-md shadow-md ${
        type === 'success'
          ? 'bg-emerald-600 shadow-emerald-600'
          : type === 'warning'
          ? 'bg-amber-600 shadow-amber-600'
          : 'bg-slate-300 shadow-slate-300'
      }`}
      onPress={onPress}
    >
      <Text className="text-slate-950 text-md">{text}</Text>
    </TouchableOpacity>
  )
}

export default DefaultButton
