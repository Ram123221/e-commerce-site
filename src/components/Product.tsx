import { productType, showPopup, hidePopup, setAllToFalse } from './ProductsMenuSlice';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { addItem } from './cartSlice';
import { useEffect } from 'react';
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import { storeType } from '../store/store';

function Product({ product }: { product: productType }) {
    const {id, image, price, rating:{rate}, title } = product;
    const dispatch = useDispatch();

    const {popupsShown} = useSelector((store:storeType)=>store.product_menu);

    useEffect(()=>{
        //for initially setting the array element's value to false
        dispatch(setAllToFalse());

        window.addEventListener("load",()=>{
            
        })
        
    },[]);


    //set to false after true set 150ms later
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            dispatch(hidePopup(id));
        },1000);
        
        return ()=>{
            clearTimeout(timeout);
        };
    }, [popupsShown[id]]);


    return (
      //single product item
    <div className='shadow-xl p-4 bg-white self-center'>
        <div className=''>
            <img src={image} alt={title.slice(0,25)} className='h-[20rem] w-max mx-auto text-center object-contain'/>
        </div>
        <div className=''>
            <span className='block font-medium pt-4'>Rs {price}</span>
            <span className='block py-1'>{
                Array(Math.floor(rate)).fill("").map((_, i)=>{
                    return (
                        <span key={i} className='text-yellow-600 inline-block pr-1'>
                            <BsStarFill />
                        </span>
                    )
                })
            }
            {
                (rate-Math.floor(rate) > 0) &&
                <span className='text-yellow-600 inline-block pr-1'>
                            <BsStarHalf />
                        </span>
            }
            </span>
            <span className='block text-sm pb-4'> {title.slice(0,17)}...</span>
        </div>
        <button className='bg-primary text-black font-medium p-2 mr-2' onClick={()=>{dispatch(addItem({product, id})); dispatch(showPopup(id))}}>
            Add to cart
        </button>
        <Link to={`/product/${id}`}>
            <button className="bg-black text-white p-2">
                See details
            </button>
        </Link>

        {/*popup*/}
        <div className={`p-4 bg-black text-primary rounded-sm shadow-user w-max fixed top-[70px] transform duration-300 transition-all ${popupsShown[id]?"translate-x-0 left-4":"-translate-x-full -left-2"}`}>
            <span>{title.slice(0,10)}... is added to the cart</span>
            <span className={`${popupsShown[id]?"w-0 duration-700 delay-100":"w-full duration-0 delay-300"} h-[3px] bg-primary block mt-1 transition-all`}></span>
        </div>
    </div>
  )
}

export default Product
