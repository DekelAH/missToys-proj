import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (

        <header className="app-header">
            <h1>Toys Store</h1>
            <nav>
                <NavLink className='link' to='/'>Home</NavLink>
                <NavLink className='link' to='/'>Toys</NavLink>
                <NavLink className='link' to='/'>About</NavLink>
            </nav>
            <section className="container">
                <NavLink to='/'>Login</NavLink>
            </section>
        </header>

    )
}