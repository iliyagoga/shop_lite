import React, { useContext } from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import config from '../utils/config';
import { Context } from '..';

const DeviceItem = ({device}) => {
    const history = useNavigate()
    const {rating}=useContext(Context)
    function summ(id,arr){
        let s=0
        let c=0
        for (let el of arr){
            if(el.DeviceId==id){
                c++
                s+=el.rate
            }
            else{
                s+=0
            }
        }
        if(c==0)
        return 0
        return s/c
    }
    return (
        <Col md={3} className={"mt-3"} onClick={() => {
                rating.setRate(summ(device.id,rating.ratings))
                history(DEVICE_ROUTE + '/' + device.id)}
                }>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={config.REACTE_APP_API_URL +'/'+device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.Brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{Math.round(summ(device.id,rating.ratings)*10)/10}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
