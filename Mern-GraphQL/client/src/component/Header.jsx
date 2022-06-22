import React from 'react'
import logo from '../asset/logo.png'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <Link to="/" className="navbar-brand">
                <div className="d-flex">
                    <img src={logo} alt="" className="mr-2" />
                    <div>ProjectMgmt</div>
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default Header