import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';
import config from '../utils/config';
import { fetchRating } from '../http/ratingAPI';

const Shop = observer(() => {
    const {device,rating} = useContext(Context)
    useEffect( ()=>{
        fetchTypes().then((res)=>{device.setTypes(res)})
        fetchBrands().then((res)=>{device.setBrands(res)})
        fetchRating().then(res=>{
            rating.setRatings(res.data)}).catch(()=>{})
    },[])
    useEffect( ()=>{
        fetchDevices(device.selectedType.id,device.selectedBrand.id,device.page,config.LIMIT).then((res)=>{
            device.setTotalCount(res.count)
            device.setDevices(res.rows)})
    },[device.page,device.selectedType,device.selectedBrand])


    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
