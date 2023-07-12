import {makeAutoObservable} from 'mobx'
export default class DeviceStore{
    constructor(){
        this._types=[
            {id:1 , type:'Холодильники'},
            { id:2, type: 'Смартфоны'}
        ]

        this._brands=[
            {id:1 , type:'Apple'},
            { id:2, type: 'Samsung'}
        ]
        this._selectedType={}
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
    get Types(){
        return this._brands
    }
    get Brands(){
        return this.brands
    }
    get Devices(){
        return this._devices
    }
    get SelectedType(){
        return this._selectedType
    }
}