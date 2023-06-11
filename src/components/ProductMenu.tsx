import { useSelector, useDispatch } from "react-redux";
import { storeType } from "../store/store";
import Product from "./Product";
import { activateCategory, getProductsByCategory } from "./ProductsMenuSlice";

function ProductMenu() {
    const { categories, productsByCategory, activeCategory } = useSelector((store: storeType) => store.product_menu);
    const dispatch = useDispatch();
    
    //filter only men's and women's clothes as
    // const filteredProducts = products.filter(product => (product.category == "men's clothing" || product.category== "women's clothing"));
    // console.log(filteredProducts)

  return (
    <>
      <h1 className="text-2xl font-bold font-serif px-16 pb-4">Categories</h1>
      {/*categories*/}
      <div className="px-16 py-2 flex items-center flex-wrap gap-2 mb-6 max-w-[800px]">
        <button className={`uppercase font-medium text-sm small-caps  ${activeCategory=="all"?"bg-black text-white":""} px-3 py-2 rounded-sm group whitespace-nowrap after:content-normal after:block after:h-1 after:bg-black after:transform after:origin-right after:scale-x-0 after:transition-all after:duration-500 hover:after:origin-left hover:after:scale-x-100`} onClick={()=>{dispatch(getProductsByCategory("all")); dispatch(activateCategory("all"))}}>all</button>
        {
          categories.map((category,i)=>{
            return (
              <button className={`uppercase font-medium text-sm small-caps  ${activeCategory==category?"bg-black text-white":""} group px-3 py-2 rounded-sm whitespace-nowrap after:content-normal after:block after:h-1 after:bg-black after:transform after:origin-right after:scale-x-0 after:transition-all after:duration-500 hover:after:origin-left hover:after:scale-x-100`} key={i} onClick={()=>{dispatch(getProductsByCategory(category)); dispatch(activateCategory(category))}}>
                {category}
              </button>
            )
          })
        }
      </div>

      {/*product menu*/}
      <div className="grid pb-16 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[70%] md:max-w-[90%] mx-auto md:auto-cols-1/2 lg:auto-cols-1/3 xl:auto-cols-1/4">
          {

              productsByCategory.map(product => {
                  const { id } = product;
                  return (
                  <Product key={id} product={product} />
              )
              })
          }
      </div>
    </>
  )
}

export default ProductMenu
