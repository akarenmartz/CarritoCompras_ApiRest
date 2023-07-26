import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavLinkImg
  } from './NavbarElements';


function Navbar() {
    return (
        <>
            <Nav>
                <NavLink>
                    <img src={require('./lab.png')} alt='logo' />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Home
                    </NavLink>
                    <NavLink to='/productos' activeStyle>
                        Productos
                    </NavLink>
                    <NavLink to='/carrito' activeStyle>
                        <img src={require('./carrito.png')} alt='logo' />
                    </NavLink>
                </NavMenu>
            </Nav>
        </>

      );
}

export default Navbar
