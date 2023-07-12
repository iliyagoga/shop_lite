import { ADMIN_ROUTE, LOGIN_ROUTE } from "./utils/consts"
import Auth from './pages/Auth.jsx'
import Admin from './pages/Admin.jsx'
export const authRoutes =[

]

export const publicRoutes = [
 {path: LOGIN_ROUTE, Component: Auth }  ,
 {path: ADMIN_ROUTE, Component: Admin} 
]