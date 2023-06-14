import {useSelector, useDispatch} from "react-redux";
import { storeType } from "../store/store";
import CartItem from "./CartItem";
import { closeCart, clearCart, calculateTotal } from "./cartSlice";
import {TiTimesOutline} from "react-icons/ti";
import { useEffect } from "react";
 
function Cart() {
  const {cartItems, isCartOpen, total} = useSelector((store:storeType) => store.cart);
  const dispatch = useDispatch();

  //for calculating the total and numberOfItems each time cartItems changes
  useEffect(()=>{
    dispatch(calculateTotal());
  },[]);

  useEffect(()=>{
    dispatch(calculateTotal());
  },[cartItems]);

 return <div className={`fixed z-10 right-0 top-0 h-screen w-full grid grid-flow-col grid-cols-[0px_auto] sm:grid-cols-[auto_380px] bg-black bg-opacity-30 ${isCartOpen?"translate-x-0":"translate-x-full delay-300"}`}>
  <div>{/*empty transparent overlay*/}</div>
  <div className={`bg-white transform relative ${isCartOpen? "translate-x-0":"translate-x-full"} duration-300 overflow-auto`}>
    {
      cartItems.length==0?
        <>
          <h3 className="m-4 text-xl font-serif font-bold pb-1 mb-3 border-b-[3px] border-primary w-max">Shopping bag (0)</h3>
          <p className="m-4 tracking-tighter text-[1.1rem]">No items in the cart, keep on searching for your favorite products!!!</p>
          <span className="absolute right-3 top-2 text-4xl text-red-600 cursor-pointer" onClick={()=>dispatch(closeCart())}>
            <TiTimesOutline />
          </span>
        </>
      :
        <>
          <h1 className={`m-4 font-serif text-xl font-bold pb-1 mb-3 border-b-[3px] border-primary w-max`}>Items in the cart</h1>

          {cartItems.map(item=>{
            const {id} = item;
            return (
              <CartItem key={id} {...item} />
            )
          })}
          <span className="absolute right-3 top-2 text-4xl text-red-600 cursor-pointer" onClick={()=>dispatch(closeCart())}>
            <TiTimesOutline />
          </span>

          <div className="flex justify-between px-4">
            <span>Total:-</span>
            <span>Rs {total}</span>
          </div>

          <div className="m-4 border border-black" onClick={()=>dispatch(clearCart())}>
            <button className="px-4 py-2 uppercase tracking-wider font-normal text-black w-[100%]">
              clear cart
            </button>
          </div>

          <div className="m-4">
            <button className="px-4 py-2 uppercase tracking-wider font-bold bg-primary text-blue_white hover:bg-primary_dark transition-all duration-75 w-[100%]">
              checkout
            </button>
          </div>
        </>
    }
  </div>
</div>
}

export default Cart;

