import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/esm/Form'
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Button from "react-bootstrap/esm/Button";
import { observer } from "mobx-react-lite";
import {login, registration} from "../http/userAPI";
import { Context } from "..";

export const Auth= observer(()=>{
    const {user}= useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail]=useState('')
    const [pass,setPass] = useState('')
    const [pass2,setPass2] = useState('')
    const nav =useNavigate()
    const signIn= async (email,password)=>{
        try {
            if(pass==pass2){
                let data
                if(isLogin){
                    data= await login(email,password)
                }
                else{
                    data= await registration(email,password)
                }
                user.setUser(data)
                user.setIsAuth(true)
                nav(SHOP_ROUTE)
            }
            else{
                alert('Пароли не совпадают')
            }
            
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }
 return ( <Container
    className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}
>
    <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
            <Form.Control
                className="mt-3"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                placeholder="Введите ваш логин"
            />
            <Form.Control
                className="mt-3"
                value={pass}
                onChange={(e)=>{
                    setPass(e.target.value)
                    isLogin&&setPass2(e.target.value)
                }}
                placeholder="Введите ваш пароль"
                type="password"
            />
            {!isLogin&&<Form.Control
                className="mt-3"
                value={pass2}
                onChange={(e)=>{
                    setPass2(e.target.value)
                }}
                placeholder="Введите ваш пароль"
                type="password"
            />}
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {isLogin ?
                    <div>
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                    </div>
                }
                <Button 
                    variant={"outline-success"}
                    onClick={()=>signIn(email,pass)}
                >
                    {isLogin ? 'Войти' : 'Регистрация'}
                </Button>
            </Row>

        </Form>
    </Card>
</Container>)
})