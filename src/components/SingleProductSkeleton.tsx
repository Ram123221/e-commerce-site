import { skeleton_data } from "../data/skeleton_data";

function SingleProductSkeleton() {
    const {image, title, description, price} = skeleton_data;

  return (
    <div className="px-16 py-24 grid grid-rows-[max-content_max-content] md:grid-cols-[60%_auto] md:grid-rows-[unset] md:items-center gap-16 max-w-[600px] md:max-w-[900px] mx-auto">
        {/* ProductDetails Skeleton*/}
        <div className="relative">
            <div className="skeleton"></div>
            <img src={image} alt={title.slice(0,17)} className="" />
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
