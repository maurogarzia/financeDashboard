
import './App.css'

import { MainScreen } from './Screens/MainScreen/MainScreen'
import { SummaryScreen } from './Screens/SummaryScreen/SummaryScreeen'
import useStoreModal from './store/useStoreModal'

function App() {
  
  const {viewScreen} = useStoreModal()

  return (
    <>
      {!viewScreen ? <MainScreen/> : <SummaryScreen/>}
      
    </>
  )
}

export default App
