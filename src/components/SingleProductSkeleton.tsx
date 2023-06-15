import { skeleton_data } from "../data/skeleton_data";

function SingleProductSkeleton() {
    const {image, title, description, price} = skeleton_data;

  return (
    <div className="px-16 py-24 grid grid-rows-[max-content_max-content] md:grid-cols-[60%_auto] md:grid-rows-[unset] md:items-center gap-16 max-w-[600px] md:max-w-[900px] mx-auto">
        {/* ProductDetails Skeleton*/}
        <div className="relative">
            <div className="skeleton"></div>
            <img src={image} alt={title.slice(0,17)} className="" />

            {/*loading bar animation*/}
            <div className="absolute rotate-180 grid grid-cols-3 gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-16">
                    <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar1"></div>
                </div>
                <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar2"></div>
                <div className="w-4 bg-blue_white_dark h-16 loading-bar loading-bar3"></div>
            </div>
            
        </div>

        <div>

            <div className="relative">
                <h1 className="uppercase font-bold text-2xl tracking-tight">{title}</h1>
                <h1 className="skeleton uppercase font-bold text-2xl tracking-tight w-max">{title}</h1>
            </div>

            <div className="relative">
                <h1 className="font-serif font-bold text-lg py-4">Rs {price}</h1>
                <h1 className="skeleton font-serif font-bold text-lg my-4 w-max">Rs {price}</h1>
            </div>

            <div className="relative">
                <p className="pb-4 text-sm leading-6">{description}</p>
                <p className="skeleton mb-4 text-sm leading-6">{description}</p>
            </div>

            <div className="relative">
                <button className="uppercase font-extrabold bg-primary text-blue_white px-6 py-3">add to cart</button>
                <button className="skeleton uppercase font-extrabold bg-primary text-blue_white px-6 py-3">add to cart</button>
            </div>
        </div>

    </div>
  )
}

export default SingleProductSkeleton
