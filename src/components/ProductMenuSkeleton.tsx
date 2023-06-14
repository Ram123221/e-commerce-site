import ProductSkeleton from "./ProductSkeleton";

function ProductMenuSkeleton() {
  return (
    <>
    <h1 className="text-2xl font-bold font-serif px-16 pb-4">Categories</h1>

    {/*categories skeleton*/}
    <div className="px-16 py-2 flex items-center flex-wrap gap-2 mb-6 max-w-[800px]">

    {
        Array(8).fill("").map((_,i)=>{
            return (
                <div className="relative" key={i}>
                    <button className={`uppercase category font-medium text-sm small-caps  bg-transparent text-transparent  px-3 py-2 rounded-sm group whitespace-nowrap`}>alltk</button>
                    <button  className={`uppercase font-medium text-sm small-caps  bg-transparent text-transparent  px-3 py-2 rounded-sm group whitespace-nowrap`}>alltk</button>
                </div>
            )
        })
    }

    </div>

    {/*product menu skeleton*/}
    <div className="grid pb-16 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[70%] md:max-w-[90%] mx-auto md:auto-cols-1/2 lg:auto-cols-1/3 xl:auto-cols-1/4">

        {
            Array(23).fill("").map((_,i)=>{
                return (
                    <ProductSkeleton key={`skeleton${i}`} />
                )
            })
        }

    </div>
  </>
  )
}

export default ProductMenuSkeleton
