import React from 'react'
import { NavLink } from 'react-router'

const NavBar = () => {
  return (
    <div className="nav-bar flex flex-row gap-4 place-content-evenly">
      <NavLink to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/pastes"}>
        Paste
      </NavLink>
    </div>
  )
}

export default NavBar
