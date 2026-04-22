import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Items from './pages/Items/Items'
import Sidebar from './components/Sidebar/Sidebar'
import HandWarmer from './pages/HandWarmer/HandWarmer'
import HandWarmerList from './pages/HandWarmerList/HandWarmerList'

const App = () => {
  return (
    <div className='app'>
      <Sidebar/>
      <div className='admin'>
        <h1>Welcome to admin panel</h1>
      </div>

      <Routes>
        <Route path='/items' element={<Items/>}/>
        <Route path='/handwarmer' element={<HandWarmer/>}/>
        <Route path='/handwarmerlist' element={<HandWarmerList/>}/>
      </Routes>
    </div>
  )
}

export default App
