import { configureStore } from "@reduxjs/toolkit";
import userReducer from './fetures/user/userSlice';
import cartReducer from "./fetures/cart/cartSlice"; 
const store=configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,

    }
})
export default store;