import {makeAutoObservable} from 'mobx'
export default class DeviceStore{
    constructor(){
        this._types=[]
        this._brands=[]
        this._devices=[]
        this._selectedType=0
        this._selectedTypeBuf=0
        this._selectedBrand=0
        this._selectedBrandBuf=0
        this._page = 1
        this._totalCount = 0
        this._limit = 3
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
        this.setPage(1)
        this._selectedType=selectedType
    }
    setSelectedTypeBuf(selectedType){
        this._selectedTypeBuf=selectedType
    }
    setSelectedBrand(selectedBrand){
        this.setPage(1)
        this._selectedBrand=selectedBrand
    }
    setSelectedBrandBuf(selectedBrand){
        this._selectedBrandBuf=selectedBrand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
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
    get selectedTypeBuf(){
        return this._selectedTypeBuf
    }
    get selectedBrand(){
        return this._selectedBrand   
    }
    get selectedBrandBuf(){
        return this._selectedBrandBuf   
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}