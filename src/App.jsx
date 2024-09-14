import React from 'react'
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom'
import Home from "./UI/Home"
import Menu, {loader as menuLoader} from './fetures/menu/Menu'
import Cart from './fetures/cart/Cart '
import Order, {loader as orderLoader} from './fetures/order/Order'
import CreateOrder, {action as createOrderAction} from "./fetures/order/CreateOrder"
import AppLayout from './UI/AppLayout'
import NotFound from './UI/Error'
const route=createBrowserRouter([
  
  {
    element:<AppLayout/>,
    errorElement:<NotFound/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/menu',
        element:<Menu/>,
        loader: menuLoader,
        errorElement:<NotFound/>
      },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/order/:orderId",
          element:<Order/>,
          loader:orderLoader,
          errorElement:<NotFound/>
        },
        {
          path:"/order/new",
          element:<CreateOrder/>,
          action:createOrderAction,
          errorElement:<NotFound/>
        }

    ]
  },

  
])
export default function App() {
 
  return (
   < RouterProvider router={route}/>
  )
}

