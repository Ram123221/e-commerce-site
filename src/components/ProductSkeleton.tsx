import {BsStarFill, BsStarHalf} from "react-icons/bs";
import { skeleton_data } from "../data/skeleton_data";

function ProductSkeleton() {
    const { price, rating:{rate}, title, image} = skeleton_data;

    return (
      //single product item
    <div className='shadow-xl relative cursor-pointer p-4 bg-white self-center group overflow-hidden'>

        <div className='relative'>

            <div className="skeleton"></div>
            <img src={image} alt={title.slice(0,25)} className='h-[20rem] w-max mx-auto text-center object-contain'/>

        </div>

        <div className=''>

            <span className='block font-medium mt-4'>
                <span className="relative">
                    <span className="skeleton">
                        Rs {price}
                    </span>
                    <span className="text-transparent">
                        Rs {price}
                    </span>
                </span>
            </span>

                <span className='block py-1'>{
                    Array(Math.floor(rate)).fill("").map((_, i)=>{
                        return (
                            <span key={i} className='text-yellow-600 inline-block pr-1 relative'>
                                <BsStarFill className="skeleton-star" />
                                <BsStarFill />
                            </span>
                        )
                    })
                }

                {
                    (rate-Math.floor(rate) > 0) &&
                    <span className='text-yellow-600 inline-block pr-1 relative'>
                        <BsStarHalf className="skeleton-star" />
                        <BsStarHalf />
                    </span>
                }

                </span>

            <span className='block text-sm pb-4'>

                <span className="relative">

                    <span className="skeleton">
                        {title.slice(0,17)}...
                    </span>

                    <span>
                        {title.slice(0,17)}...
                    </span>

                </span>
            </span>

        </div>

    </div>
  )
}

export default ProductSkeleton
