import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.slate[950],
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Escolha minha viagem!',
        }}
      />
      <Stack.Screen
        name="menu"
        options={{
          title: 'Menu',
        }}
      />
    </Stack>
  )
}
