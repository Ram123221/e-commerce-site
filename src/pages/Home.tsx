import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { AppDispatch, storeType } from '../store/store';
import { fetchProducts, fetchCategories } from '../components/ProductsMenuSlice';
import ProductMenu from '../components/ProductMenu';
import Hero from '../components/Hero';
import ProductMenuSkeleton from '../components/ProductMenuSkeleton';

function Home() {
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading } = useSelector((store: storeType) => store.product_menu);
    
    const fetchDatas = ()=>{
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    };

    useEffect(() => {
        fetchDatas();
    }, []);
    
  return (
      <div id="home" className={`bg-blue_white`}>

        <Hero />
        {/* <h2>categories list goes here...</h2> */}

        {
          isLoading==true?
          //when datas are in fetching process but not fetched yet
          <ProductMenuSkeleton />
          :
          //data fetched successfully
          <ProductMenu />
        }

    </div>
  )
}

export default Home
