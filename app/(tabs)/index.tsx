import React, { useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import DefaultRadioButton from '@/components/DefaultRadioButton'
import DefaultButton from '@/components/DefaultButton'
import DefaultTextInput from '@/components/DefaultTextInput'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import { Modal } from 'react-native-paper'
import colors from 'tailwindcss/colors'
import axios from 'axios'
import { AxiosService } from '@/services/axiosService'

export default function Index() {
  const axiosService = new AxiosService()

  const [message, setMessage] = useState('')
  const [climate, setClimate] = useState<'hot' | 'cold'>('hot')
  const [budget, setBudget] = useState<string>('')
  const [interests, setInterests] = useState('')
  const [maxDistance, setMaxDistance] = useState('')
  const [maxTime, setMaxTime] = useState('')
  const [activities, setActivities] = useState('')
  const [fetchingResponse, setFetchingResponse] = useState(false)
  const sliderProgress = useSharedValue(5)
  const minSliderValue = useSharedValue(0)
  const maxSliderValue = useSharedValue(10)

  const clear = () => {
    setBudget('')
    setInterests('')
    setMaxDistance('')
    setMaxTime('')
    setActivities('')
    setClimate('hot')
    setMessage('')
  }

  const buildMessage = () => {
    const requestMessage =
      `Eu estou planejando uma viagem, meu orçamento é de R$${budget}` +
      ` e meus interesses são: ${interests}. \nEu prefiro clima ${
        climate === 'hot' ? 'quente' : 'frio'
      }.` +
      `\nA distância máxima para a viagem é ${maxDistance} Km e o tempo máximo é de ${maxTime} dias.` +
      `\nAlém disso, de 0 a 10, sendo 0 conforto e 10 aventura, eu me considero como um ${sliderProgress}` +
      `\nMe recomende um destino (país, estado ou até cidade) fora do Brasil que condiza com essas requisições e justifique.` +
      `\nResponda como se fosse uma agência de viagens.`
    return requestMessage
  }

  const sendMessage = async () => {
    setFetchingResponse(true)
    setMessage('')
    const requestMessage = buildMessage()
    const response = await axiosService.sendMessage(requestMessage)
    console.log(response)
    setFetchingResponse(false)
    setMessage(response.content)
  }

  return (
    <ScrollView
      className="flex-col p-8 bg-slate-900 h-full pb-20"
      contentContainerClassName="gap-8 pb-20"
    >
      <DefaultTextInput
        placeholder="Orçamento"
        inputMode="numeric"
        value={budget}
        onChange={setBudget}
      />
      <DefaultTextInput
        placeholder="Fale sobre seus interesses pessoais"
        multiline
        numberOfLines={4}
        value={interests}
        onChange={setInterests}
      />
      <View>
        <View className="flex-row items-center gap-4">
          <DefaultRadioButton
            value="Quente"
            status={climate === 'hot' ? 'checked' : 'unchecked'}
            onPress={() => setClimate('hot')}
          />
          <Text className="text-slate-50">Prefiro clima quente</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <DefaultRadioButton
            value="Frio"
            status={climate === 'cold' ? 'checked' : 'unchecked'}
            onPress={() => setClimate('cold')}
          />
          <Text className="text-slate-50">Prefiro clima frio</Text>
        </View>
      </View>
      <View className="flex flex-row items-center gap-4">
        <DefaultTextInput
          placeholder="Distância máx (Km)"
          inputMode="numeric"
          value={maxDistance}
          onChange={setMaxDistance}
          className="flex flex-1"
        />
        <DefaultTextInput
          value={maxTime}
          onChange={setMaxTime}
          placeholder="Tempo máx (dias)"
          inputMode="numeric"
          className="flex flex-1"
        />
      </View>
      <DefaultTextInput
        placeholder="Quais atividades você gostaria de fazer?"
        multiline
        numberOfLines={4}
        value={activities}
        onChange={setActivities}
      />
      <Text className="text-slate-50 text-md">
        De 0 a 10, sendo 10 aventura e 0 conforto, escolha um valor na escala:
      </Text>
      <Slider
        progress={sliderProgress}
        minimumValue={minSliderValue}
        maximumValue={maxSliderValue}
        steps={10}
        style={{
          maxHeight: 20,
        }}
        theme={{
          minimumTrackTintColor: colors.slate[600],
          maximumTrackTintColor: colors.slate[800],
          bubbleBackgroundColor: colors.slate[50],
        }}
        bubbleTextStyle={{
          color: colors.slate[950],
          margin: 2,
        }}
        markStyle={{ backgroundColor: colors.slate[500] }}
        forceSnapToStep
      />

      <DefaultButton
        text="Enviar Mensagem"
        onPress={sendMessage}
        type="success"
      />
      <DefaultButton text="Limpar" onPress={clear} type="warning" />

      {message && !fetchingResponse && (
        <View className="flex-col items-center gap-2">
          <Text className="text-2xl text-slate-50 font-bold">
            Nossa resposta
          </Text>
          <View className="bg-slate-300 p-2 rounded-md">
            <Text>{message}</Text>
          </View>
        </View>
      )}
      {fetchingResponse && !message && <ActivityIndicator size="large" />}
    </ScrollView>
  )
}
