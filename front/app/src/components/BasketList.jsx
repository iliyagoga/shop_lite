import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import BasketItem from './BasketItem';

const BasketList = observer(() => {
    const {basket}= useContext(Context)
    return (
        <Row className="d-flex " style={{flexDirection:"column",margin: "auto",width: "min-content"}}>
            {basket.devices.map(device =>
                <BasketItem className='mt-5' key={device.id} device={device}/>
            )}
        </Row>
    );
});

export default BasketList;