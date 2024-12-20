import { AxiosService } from '@/services/axiosService'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const axiosService = new AxiosService()

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    const response = await axiosService.sendMessage(
      'olá, você consegue me responder?'
    )

    setMessage(response.content)
  }

  return (
    <View className="flex-1 p-8">
      <Text className="text-lg text-black">Tab One</Text>
      <TouchableOpacity
        className="flex-row justify-center items-center bg-slate-900 p-4"
        onPress={sendMessage}
      >
        <Text className="text-white text-2xl">Send Message to API</Text>
      </TouchableOpacity>
      {message && <Text className="text-slate-950">{message}</Text>}
    </View>
  )
}
