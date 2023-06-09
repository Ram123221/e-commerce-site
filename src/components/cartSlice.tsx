import {createSlice} from "@reduxjs/toolkit";
import { productType } from "./ProductsMenuSlice";

export interface cartItemType extends productType{
    quantity: number,
};

export interface cartType{
    cartItems: cartItemType[],
    total: number,
    numOfItems: number,
    isCartOpen: boolean,
};

const initialState:cartType = {
    cartItems: [],
    total: 0,
    numOfItems: 0,
    isCartOpen: false,
};

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action)=>{
            const {payload:{product, id}} = action;
            // console.log(product, id);
            const newCartItem = {...product, quantity: 1};
            
            //if the cart is empty// initial case
            if(state.cartItems.length == 0){
                state.cartItems = [newCartItem];
                // console.log(state.cartItems);
            }
            //cart contains at least 1 item
            else{
               const itemAlreadyInCart = state.cartItems.find(item=>item.id==id);
               //if item that is added currently is in the cart already
                if(itemAlreadyInCart){
                    const newCartItems = state.cartItems.map((item)=>{
                        if(item.id == id){
                            return {...item, quantity: item.quantity+1};
                        }
                        else{
                            return item;
                        }
                    });
                    state.cartItems = newCartItems;
                    // console.log(state.cartItems);
                }
                //if item added is not present in the cart yet
                else{
                    state.cartItems = [...state.cartItems, newCartItem];
                    // console.log(state.cartItems);
                }
            }
        },
        openCart: (state)=>{
            state.isCartOpen = true;
        },
        closeCart: (state)=>{
            state.isCartOpen = false;
        },
        removeItem: (state, action)=>{
            const {payload} = action;
            const newCartItems = state.cartItems.filter(item=>item.id!=payload);
            state.cartItems = newCartItems;
        },
        clearCart: (state)=>{
            state.cartItems = [];
        },
        increaseQuantity: (state, action)=>{
            const {payload} = action;
            const newCartItems = state.cartItems.map(item=>{
                if(item.id == payload)
                    return {...item, quantity: item.quantity+1};
                else
                    return item;
            });

            state.cartItems = newCartItems;
        },
        decreaseQuantity: (state, action)=>{
            const {payload} = action;
            const newCartItems = state.cartItems.map(item=>{
                if(item.id == payload)
                    return {...item, quantity: item.quantity-1};
                else
                    return item;
            });

            state.cartItems = newCartItems.filter(item=>item.quantity!=0);
        },
        calculateTotal: (state)=>{
            //clearing count
            state.numOfItems = 0;
            state.total = 0;
            if(state.cartItems.length != 0){
                state.cartItems.forEach(item=>{
                    state.total += item.quantity * parseFloat(item.price);
                    state.numOfItems += item.quantity;
                });
                state.total = parseFloat(state.total.toFixed(2));
            }
            else{
                state.total= 0;
                state.numOfItems = 0;
            }
        }
    }
});

export default cart.reducer;
export const {addItem, openCart, closeCart, removeItem, clearCart, increaseQuantity, decreaseQuantity, calculateTotal} = cart.actions;
