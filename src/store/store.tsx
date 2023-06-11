//shall include the following three slices
//1. Cart  2. ProductsMenu   3. Sidebar

import { configureStore } from "@reduxjs/toolkit";
import ProductMenuReducer from "../components/ProductsMenuSlice";
import { productsType } from "../components/ProductsMenuSlice";
import cartReducer, { cartType } from "../components/cartSlice";
import heroReducer from "../components/HeroSlice";
import { heroStateType } from "../components/HeroSlice";
import { headerSliceType } from "../components/HeaderSlice";
import headerReducer from "../components/HeaderSlice";
import widthHeightReducer from "../responsive/WidthHeightSlice";
import { widthHeightType } from "../responsive/WidthHeightSlice";

export interface storeType{
    width_height_provider: widthHeightType,
    header:  headerSliceType,
    hero: heroStateType,
    product_menu: productsType,
    cart: cartType,
};

export const store = configureStore({
    reducer: {
        width_height_provider: widthHeightReducer,
        header: headerReducer,
        hero: heroReducer,
        product_menu: ProductMenuReducer,
        cart: cartReducer,
    },
});


export type AppDispatch = typeof store.dispatch;