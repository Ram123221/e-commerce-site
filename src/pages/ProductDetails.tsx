//single product details shown here
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { useDispatch } from "react-redux";
import { addItem } from "../components/cartSlice";

function ProductDetails() {
   const {id}= useParams();
   const {products} = useSelector((store:storeType)=>store.product_menu);

  const dispatch = useDispatch();

   const singleProduct = products.find((product=>product.id==parseInt(id as string)));

   useEffect(()=>{
    window.scrollTo(0,0);
   },[])

   if(singleProduct){
    const {title, price, description,image} = singleProduct;

     return (
       <div className="p-4 grid grid-rows-2 md:grid-cols-[60%_auto] md:grid-rows-[unset] md:items-center gap-16 max-w-[600px] md:max-w-[900px] mx-auto">
         {/* ProductDetails */}
         <img src={image} alt={title.slice(0,17)} className="" />

         <div>
          <h1 className="uppercase font-bold text-2xl tracking-tight">{title}</h1>
          <h1 className="font-serif font-bold text-lg py-4">Rs {price}</h1>
          <p className="pb-4 text-sm leading-6">{description}</p>
          <button className="uppercase font-extrabold bg-primary px-6 py-3" onClick={()=>dispatch(addItem({product: singleProduct, id}))}>add to cart</button>
         </div>
       </div>
     )
   }

   return <></>
}

export default ProductDetails
