import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    console.log(device)
    return (
        <ListGroup className={'d-flex'}>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer',}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                    
                >
                    {type.type}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
