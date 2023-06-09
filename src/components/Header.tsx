import {BsCart3} from "react-icons/bs";
import { openCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";

function Header() {
  const {numOfItems} = useSelector((store:storeType)=>store.cart)
  const dispatch = useDispatch();

  return (
    <div className="bg-blue_white shadow-[0_0_7px_0px_#EBF9FF] sticky top-0 left-0 z-10">
      <div className="flex items-center pl-4 pr-8 py-2 lg:px-[unset] lg:max-w-[90%] lg:mx-auto justify-between">

        <div className="flex gap-4 px-4 lg:px-[unset] font-medium">
          <span className="cursor-pointer px-2 py-2">Home</span>
          <span className="cursor-pointer px-2 py-2">About</span>
          <span className="cursor-pointer px-2 py-2">Contact</span>
        </div>

        <span className="text-3xl cursor-pointer relative inline-block" onClick={()=>dispatch(openCart())}>
          <BsCart3 />

          <span className="text-sm absolute -right-1/2 -top-1/4 bg-primary border-[1px] border-black w-6 h-6 grid items-center justify-center rounded-full text-black font-bold leading-none">
            {numOfItems}
          </span>
        </span>

      </div>
    </div>
  )
}

export default Header
