import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { createBrand } from '../../http/deviceAPI';
import { createRating, fetchRating } from '../../http/ratingAPI';
import { useParams } from 'react-router-dom';

const CreateRating = ({show, sR,onHide}) => {
    const [value,setValue] = useState(100)
    const {id}= useParams()
    function summ(arr){
        let s=0
        let c=0
        for (let el of arr){
            c++
            s+=el.rate
        }
        return s/c
    }
    function addRating(){
        createRating(id,Math.ceil(value/10)).then((data)=>{
            if(data){
                fetchRating(id).then(d=>{
                    sR(summ(d.data))
                }).catch(e=>sR(0))
            }
            else{
                alert('Вы уже ставили оценку данному товару')
            }
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оценить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>{Math.ceil(value/10)}</Form.Label>
                <Form>
                    <Form.Range
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRating}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateRating;
