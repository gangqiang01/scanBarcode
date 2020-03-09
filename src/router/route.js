
import scanBarcode from "../components/scanBarcode/list"
import login from "../components/account/login"
import main from '@/components/home'

let childRoute = [

    {
        path: 'scanBarcode',
        component: scanBarcode,
        name: 'scanBarcode',
        meta: {
            menuname: "scanBarcode"
        }
    },
    {
        path: '*',
        redirect:'scanBarcode'
    }
]

let route = [

    {
        path: '/',
        component: login,
        name: 'login',
        beforeEnter: (to, from, next) => {
            _g.doBeforeLoginout();
            next();
        }
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        beforeEnter: (to, from, next) => {
            if(cookie.checkCookie("scanBarcodeToken")){
                next()
            }else{
                _g.doBeforeLoginout();
                next("/")
            }
        },
        children: childRoute,
        redirect:'/main/scanBarcode',    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route