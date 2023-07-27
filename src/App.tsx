import './App.css'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Dropdown from './stories/Dropdown'
import Table from './stories/Table'
import { setMod350 } from './slice/dataSlice'

interface Open{
  number: boolean,
  mod350: boolean,
  mod8000: boolean,
  mod20002: boolean
}

function App() {

  const [open, setOpen] = useState<Open>({number:false, mod350:false, mod8000:false, mod20002:false});

  return (
    <Provider store={store}>
      <div className='container'>
        <div className='dropdown-container'>
          <Dropdown label='number' open={open.number} handleOpen={()=>setOpen({number:!open.number, mod350:false, mod8000:false, mod20002:false})} />
          <Dropdown label='mod350' open={open.mod350} handleOpen={()=>setOpen({number:false, mod350:!open.mod350, mod8000:false, mod20002:false})}/>
          <Dropdown label='mod8000' open={open.mod8000} handleOpen={()=>setOpen({number:false, mod350:false, mod8000:!open.mod8000, mod20002:false})}/>
          <Dropdown label='mod20002' open={open.mod20002} handleOpen={()=>setOpen({number:false, mod350:false, mod8000:false, mod20002:!open.mod20002})}/>
        </div>
        <Table/>
      </div>
    </Provider>
  )
}

export default App
