import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Item from './pages/Item/Item'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import Cart from './pages/Cart/Cart'


const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  const [users, setUsers] = useState([
    {
      id: 0,
      username: "test1Username",
      email: "test1Email@gmail.com",
      password: "test1Password",
      hand_warmers_placed: [],
    }
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <div className='app'>

        {showLogin ? <Login users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} setShowLogin={setShowLogin} /> : <></>}
        <NavBar setShowLogin={setShowLogin} currentUser={currentUser}/>


        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />} />
          <Route path='/item/:id' element={<Item users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='cart' element={<Cart users={users} currentUser={currentUser} setUsers={setUsers}/>}/>

        </Routes>

      </div>
    </>
  )
}

export default App
