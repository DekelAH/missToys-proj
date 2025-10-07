import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (

        <header className="app-header-section">
            <h1 className="logo">Toys Store</h1>
            <nav className="nav-header">
                <NavLink className='link' to='/'>Home</NavLink>
                <NavLink className='link' to='/toy'>Toys</NavLink>
                <NavLink className='link' to='/about'>About</NavLink>
            </nav>
        </header>

    )
}