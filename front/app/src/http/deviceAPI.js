import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'
export  async function createType(name){
    const {data} = await $authHost.post('api/type',{name})
    return data
}
export  async function fetchTypes(){
    const {data} = await $host.get('api/type')
    return data
}
export  async function createBrand(name){
    const {data} = await $authHost.post('api/brand',{name})
    return data
}
export  async function fetchBrands(){
    const {data} = await $host.get('api/brand')
    return data
}
export  async function createDevice(device){
    const {data} = await $authHost.post('api/device',device)
    return data
}
export  async function fetchDevices(typeId, brandId, page,limit){
    const {data} = await $host.get('api/device',{params:{typeId, brandId, page,limit}})
    return data
}
export  async function fetchDevice(id){
    const {data} = await $host.get('api/device/'+id)
    return data
}