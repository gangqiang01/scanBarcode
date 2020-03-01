
import scanBarcode from "../components/scanBarcode/list"

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
        name: 'main',
        component: main,
        children: childRoute,
        redirect:'/main/scanBarcode'    
    },
    {
        path: '*',
        redirect:'/main/scanBarcode'
    }
    
]

export default route