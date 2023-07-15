import {makeAutoObservable} from 'mobx'
export default class DeviceStore{
    constructor(){
        this._types=[
            {id:1 , type:'Холодильники'},
            { id:2, type: 'Смартфоны'}
        ]

        this._brands=[
            {id:1 , name:'Apple'},
            { id:2, name: 'Samsung'}
        ]
        this._devices=[	
            {id: 2,	name:"12 pro max",price:	12000,  rating:	0,	img: "31b406ab-a007-4ed0-8a3d-97d6c45e9684.jpg",	TypeId:2, BrandId:	2}
        ]
        this._selectedType={}
        this._selectedBrand={}
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types =types
    }
    setBrands(brands){
        this._brands=brands
    }
    setDevices(devices){
        this._devices=devices
    }
    setSelectedType(selectedType){
        this._selectedType=selectedType
    }
    setSelectedBrand(selectedBrand){
        this._selectedBrand=selectedBrand
    }
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand    }
}