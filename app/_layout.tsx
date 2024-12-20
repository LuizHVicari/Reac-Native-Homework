import 'react-native-reanimated'
import { Slot } from 'expo-router'
import '../global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  )
}

export default App
