import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import profile_template from '../../assets/profile_template.png'

const NavBar = ({ setShowLogin, currentUser }) => {

  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img className='icon' src='./icon.png' alt="" />
        <div className='brandName'>Crochet Hand Warmers</div>
      </div>

      <div className='navbar-center'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <Link to='/products' onClick={() => setMenu("products")} className={menu === "products" ? "active" : ""}>Products</Link>
        <Link to='/about' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</Link>
        <Link to='/contact' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</Link>
      </div>

      <div className='navbar-right'>
        <div className='cart'>
          <button className="cart-btn">
            <Link to='/cart'>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </button>
        </div>

        {!currentUser && (
          <ul className='logins'>
            <li onClick={() => setShowLogin(true)}>User Sign in</li>
          </ul>
        )}

        {currentUser && (
          <div className='loggedin'>
            <img className='profile-template' src={profile_template} alt="profile" />
          </div>
        )}

      </div>
    </div>
  )
}

export default NavBar
