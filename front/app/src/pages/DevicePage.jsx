import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import config from '../utils/config';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDevice } from '../http/deviceAPI';
import { addBasket } from '../http/basketAPI';
import { Context } from '..';
import { BASKET_ROUTE } from '../utils/consts';
import CreateRating from '../components/modals/CreateRating';


const DevicePage = () => {
    const[ device, setDevice] =useState([])
    const {basket,rating,user}=useContext(Context)
    const {id}= useParams()
    const [r,sR]=useState(rating.rate)
    const nav=useNavigate()
    const [show,setShow]=useState(false)   
    useEffect(()=>{
        fetchDevice(id).then((data)=>setDevice(data))
    },[])
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id === obj) {
                return true;
            }
        }
        return false;
    }
    return (<>
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={config.REACTE_APP_API_URL+'/' + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div onClick={()=>{user.isAuth===true&&setShow(true)}}
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, cursor: 'pointer', backgroundSize: 'cover', fontSize:64}}
                        >
                            {Math.round(r*10)/10}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        {user.isAuth&&
                        <Button onClick={()=>{
                            addBasket(id).then(()=>{nav(BASKET_ROUTE)})
                            }} disabled={contains(basket.devices,device.id) }variant={"outline-dark"}>Добавить в корзину</Button>}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info&&device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
        <CreateRating show={show} sR={sR}onHide={()=>setShow(false)}></CreateRating>
        </>
        
    );
};

export default DevicePage;
