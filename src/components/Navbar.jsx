import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className='nav__link' to='/'>Inicio</NavLink>
      <NavLink className='nav__link' to='/filter'>Buscar Canchas</NavLink>
      <NavLink className='nav__link' to='/contribute'>Contribuir al sitio</NavLink>
    </nav>
  )
}

export default Navbar