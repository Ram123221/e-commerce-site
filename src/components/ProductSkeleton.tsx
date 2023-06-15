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

            {/*loading bar animation*/}
            <div className="absolute rotate-180 grid grid-cols-3 gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-16">
                    <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar1"></div>
                </div>
                <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar2"></div>
                <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar3"></div>
            </div>

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
