import React, { useContext } from "react";
import {Route, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from "../utils/routes";
import {SHOP_ROUTE} from '../utils/consts';
import { Context } from "..";
import {Auth} from "../pages/Auth";
import Shop from "../pages/Shop";
export default function AppRouter(){
    const {user}= useContext(Context)
    return (<>
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>{
               return <Route key={path} path={path} Component={Component}/>
            })}
            {publicRoutes.map(({path, Component})=>{
               return  <Route key={path} path={path} Component={Component}/>
            })}
           <Route path='/*' element={<Shop/>}></Route>

        </Routes></>
    )

   }