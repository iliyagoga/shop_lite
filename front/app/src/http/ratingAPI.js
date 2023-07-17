import { $authHost } from "."

export async function createRating(DeviceId,rate){
    const res = await $authHost.post('api/rating',{DeviceId,rate})
    if(res.data.status==404)
    return false
    return res
}
export async function fetchRating(id){
    let res=[]
    if(id){
        res = await $authHost.get('api/rating?deviceId='+id)
    }
    else{
        res = await $authHost.get('api/rating')
    }
    return res
}