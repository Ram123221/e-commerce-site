//shall include the following three slices
//1. Cart  2. ProductsMenu   3. Sidebar

import { configureStore } from "@reduxjs/toolkit";
import ProductMenuReducer from "../components/ProductsMenuSlice";
import { productsType } from "../components/ProductsMenuSlice";
import cartReducer, { cartType } from "../components/cartSlice";
import heroReducer from "../components/HeroSlice";
import { heroStateType } from "../components/HeroSlice";

export interface storeType{
    hero: heroStateType,
    product_menu: productsType,
    cart: cartType,
};

export const store = configureStore({
    reducer: {
        hero: heroReducer,
        product_menu: ProductMenuReducer,
        cart: cartReducer,
    },
});


export type AppDispatch = typeof store.dispatch;