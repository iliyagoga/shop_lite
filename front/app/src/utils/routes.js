import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./consts"
import {Auth} from '../pages/Auth.jsx'
import Admin from '../pages/Admin.jsx'
import Shop from "../pages/Shop"
import DevicePage from '../pages/DevicePage'
import Basket from '../pages/Basket'
export const authRoutes =[

]

export const publicRoutes = [
 {path: LOGIN_ROUTE, Component: Auth }  ,
 {path: REGISTRATION_ROUTE, Component: Auth }  ,
 {path: ADMIN_ROUTE, Component: Admin},
 {path: SHOP_ROUTE, Component: Shop},
 {path: DEVICE_ROUTE+'/:id', Component: DevicePage},
 {path: BASKET_ROUTE, Component: Basket}
]