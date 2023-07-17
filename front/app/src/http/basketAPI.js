import axios from 'axios'
import {$authHost, $host} from './index'
export async function addBasket(DeviceId){
    const res = await $authHost.post('api/basket/add',{DeviceId})
    return res
}
export async function fetchBasket(){
    const res = await $authHost.get('api/basket',)
    return res
}
export async function removeBasket(DeviceId){
    const res = await $authHost.post('api/basket/remove',{DeviceId})
    return res
}