import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'
export  async function registration(email,password){
    const {data} = await $host.post('api/user/registration',{email,password, role:'USER'})
    localStorage.setItem('token',data)
    return jwt_decode(data)
}
export  async function login(email,password){
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token',data)
    return jwt_decode(data)
}
export  async function check(){
    const {data} =  await $authHost.get('api/user/auth')
    return jwt_decode(data)

}