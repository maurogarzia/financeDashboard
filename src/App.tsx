
import './App.css'

import { MainScreen } from './Screens/MainScreen/MainScreen'
import { ScreenProfile } from './Screens/ScreenProfile/ScreenProfile'
import { SummaryScreen } from './Screens/SummaryScreen/SummaryScreeen'
import useStoreModal from './store/useStoreModal'

function App() {
  
  const {viewScreen} = useStoreModal()

  return (
    <>
      {viewScreen === 'home' && <MainScreen/>}
      {viewScreen === 'summaryScreen' && <SummaryScreen/>}
      {viewScreen === 'profile' && <ScreenProfile/>}
      
    </>
  )
}

export default App
