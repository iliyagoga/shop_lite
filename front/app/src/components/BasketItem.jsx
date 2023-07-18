import React, { useContext } from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import config from '../utils/config';
import { removeBasket } from '../http/basketAPI';
import { Context } from '..';

const BasketItem = ({device}) => {
    const {basket}=useContext(Context)
    const nav=useNavigate()
    const remove=()=>{
        removeBasket(device.id).then(d=>{
            let copy= Object.assign(basket.devices)
            let copy2=[]
            for(let el of copy){
                if(el.id!=device.id){
                    copy2.push(el)
                }
            }
            basket.setDevices(copy2)
        })
    }
    const history = useNavigate()
    return (
        <Col md={3} className={"mt-3"} >
            <Card style={{width: 150, cursor: 'pointer'}}  onClick={()=>{nav(DEVICE_ROUTE + '/' + device.id)}}border={"light"}>
                <Image width={150} height={150} src={config.REACTE_APP_API_URL +'/'+device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.Brand.name}</div>
                </div>
                <div>{device.name}</div>
                <Button onClick={()=>{
                    remove()
                }} style={{marginTop: '20px'}}>Удалить</Button>
            </Card>
        </Col>
    );
};

export default BasketItem;
