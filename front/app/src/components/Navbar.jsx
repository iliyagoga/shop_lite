import React, { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite'
const NavBar = observer(()=>{
    const {user}= useContext(Context)
    console.log(user)
    return (<><Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <NavLink to={SHOP_ROUTE}>КупиДевайс</NavLink>
        {
            user.isAuth?
            <Nav className="ml-auto">
                <Button>Админ-панель</Button>
                <Button>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto">
                <Button onClick={()=>{user.setIsAuth(true)}}>Авторизация</Button>
            </Nav>
        }
      
    </Container>
  </Navbar>
</>)
})
export default NavBar