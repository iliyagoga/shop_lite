import React, { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite'
const NavBar = observer(()=>{
    const {user}= useContext(Context)
    const nav =useNavigate()
    const logout =()=>{
      user.setUser({})
      user.setIsAuth(false)
      localStorage.removeItem('token')
    }
    return (<><Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <NavLink to={SHOP_ROUTE}>КупиДевайс</NavLink>
        {
            user.isAuth?
            <Nav className="ml-auto">
                <Button onClick={()=>{nav(BASKET_ROUTE)}}>Корзина</Button>
                {user.user.role=='ADMIN'&&<Button onClick={()=>{nav(ADMIN_ROUTE)}}>Админ-панель</Button>}
                <Button onClick={()=>{
                  logout()
                  nav(LOGIN_ROUTE)}}>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto">
                <Button onClick={()=>{nav(LOGIN_ROUTE)}}>Авторизация</Button>
            </Nav>
        }
      
    </Container>
  </Navbar>
</>)
})
export default NavBar