import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (

        <header className="app-header">
            <h1>Toys Store</h1>
            <nav>
                <NavLink className='link' to='/'>Home</NavLink>
                <NavLink className='link' to='/toys'>Toys</NavLink>
                <NavLink className='link' to='/about'>About</NavLink>
            </nav>
            <section className="container">
                <NavLink to='/'>Login</NavLink>
            </section>
        </header>

    )
}