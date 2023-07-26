import './App.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Dropdown from './stories/Dropdown'
import Table from './stories/Table'

function App() {

  return (
    <Provider store={store}>
      <div className='container'>
        <div className='dropdown-container'>
          <Dropdown label='number'/>
          <Dropdown label='mod350' />
          <Dropdown label='mod8000' />
          <Dropdown label='mod20002'/>
        </div>
        <Table/>
      </div>
    </Provider>
  )
}

export default App
