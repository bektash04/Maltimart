import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./silces/cartSlice";


const store = configureStore({
    reducer:{
        cart: cartSlice,
    }
})


export default store
