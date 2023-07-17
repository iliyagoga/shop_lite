import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import BasketList from '../components/BasketList';
import { fetchBasket } from '../http/basketAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Basket= observer(() => {
    const {basket}=useContext(Context)
    useEffect(()=>{
        fetchBasket().then((data)=>{
            basket.setDevices(data.data)})
    },[])
    return (
        <BasketList/>
    );
});

export default Basket