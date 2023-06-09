import { cartItemType } from "./cartSlice";
import {TfiAngleLeft, TfiAngleRight} from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "./cartSlice";

function CartItem(props:cartItemType) {
    const {id, title, image, quantity, price} = props;
    const dispatch = useDispatch();

  return (
    <div className="m-4 py-3 grid grid-flow-col grid-cols-[auto_max] border-b-2 border-b-primary">
      <div>
        <img src={image} alt={title.slice(0,15)} className="w-1/3 mb-3" />
        <h3 className="text-md">{title}</h3>
        <h3 className="text-sm font-serif my-3">Rs {price}</h3>
        <button className="text-red-500" onClick={()=>dispatch(removeItem(id))}>Remove</button>
      </div>
      <div className="grid grid-cols-3 content-start">
        <button className="text-lg font-bold p-1" onClick={()=>dispatch(decreaseQuantity(id))}>
          <TfiAngleLeft />
        </button>
        <button className="text-lg font-bold p-1 cursor-text">
          {quantity}
        </button>
        <button className="text-lg font-bold p-1" onClick={()=>dispatch(increaseQuantity(id))}>
          <TfiAngleRight />
        </button>
      </div>
    </div>
  )
}

export default CartItem
