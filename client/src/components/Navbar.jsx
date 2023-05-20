import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
     <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item "><NavLink exact to="/" className="navbar-link" activeClassName="active">Home</NavLink></li>
      </ul>
      <ul className=' navbar-list ms-auto mb-2 mb-lg-0 d-flex'>
        <li className="navbar-item"><NavLink to="/about" className="navbar-link" activeClassName="active">About</NavLink></li>
        <li className="navbar-item"><NavLink to="/services" className="navbar-link" activeClassName="active">Services</NavLink></li>
        <li className="navbar-item"><NavLink to="/contact" className="navbar-link" activeClassName="active">Contact</NavLink></li>


        <li className="navbar-item "><NavLink to="/register" className="navbar-link" activeClassName="active ">Signup</NavLink></li>
        <li className="navbar-item "><NavLink to="/login" className="navbar-link" activeClassName="active">Login</NavLink></li>
        
     </ul>
    </nav>
  )
}

export default Navbar