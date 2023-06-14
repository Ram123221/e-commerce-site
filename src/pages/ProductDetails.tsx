//single product details shown here
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addItem } from "../components/cartSlice";
import { fetchCategories, fetchProducts, hidePopup, showPopup } from "../components/ProductsMenuSlice";

function ProductDetails() {
   const {products, popupsShown} = useSelector((store:storeType)=>store.product_menu);
   const {id} = useParams();

  const dispatch = useDispatch<AppDispatch>();

   const singleProduct = products.find((product=>product.id==parseInt(id as string)));

   
   const fetchDatas = ()=>{
     dispatch(fetchProducts());
     dispatch(fetchCategories());
    };
    
  useEffect(()=>{
    window.scrollTo(0,0);
    fetchDatas();
  },[]);

       //set to false after true set 150ms later
       useEffect(()=>{
        const timeout = setTimeout(()=>{
            dispatch(hidePopup(id));
        },1000);
        
        return ()=>{
            clearTimeout(timeout);
        };
    }, [popupsShown]);

   if(singleProduct){
    const {id, title, price, description,image} = singleProduct;

     return (
       <div className="px-16 py-24 grid grid-rows-[max-content_max-content] md:grid-cols-[60%_auto] md:grid-rows-[unset] md:items-center gap-16 max-w-[600px] md:max-w-[900px] mx-auto">
         {/* ProductDetails */}
         <img src={image} alt={title.slice(0,17)} className="" />

         <div>
          <h1 className="uppercase font-bold text-2xl tracking-tight">{title}</h1>
          <h1 className="font-serif font-bold text-lg py-4">Rs {price}</h1>
          <p className="pb-4 text-sm leading-6">{description}</p>
          <button className="uppercase font-extrabold bg-primary text-blue_white px-6 py-3" onClick={()=>{dispatch(addItem({product: singleProduct, id})); dispatch(showPopup(id));}}>add to cart</button>
         </div>

         {/*popup*/}
        <div className={`px-4 py-2 bg-black text-primary rounded-sm shadow-user w-max fixed top-[70px] transform duration-300 transition-all ${popupsShown[id]?"translate-x-0 left-4":"-translate-x-full -left-2"}`}>
            <span>{title.slice(0,10)}... is added to the cart</span>
            <span className={`${popupsShown[id]?"w-0 duration-700 delay-100":"w-full duration-0 delay-300"} h-[3px] bg-primary block mt-1 transition-all`}></span>
        </div>

       </div>
     )
   }

   return <></>
}

export default ProductDetails
