import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.slate[950],
        },
        headerStyle: {
          backgroundColor: colors.slate[950],
        },
        headerTitleStyle: {
          color: colors.white,
        },
        tabBarInactiveTintColor: colors.slate[400],
        tabBarActiveTintColor: colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={32} />
          ),
        }}
      />
    </Tabs>
  )
}
