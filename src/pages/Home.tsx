import { useEffect } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { AppDispatch } from '../store/store';
import { fetchProducts, fetchCategories } from '../components/ProductsMenuSlice';
import ProductMenu from '../components/ProductMenu';
import Hero from '../components/Hero';

function Home() {
    const dispatch = useDispatch<AppDispatch>();

    // const { products } = useSelector((store: storeType) => store.product_menu);
    
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, []);

    // useEffect(() => {
    //     console.log(products);
    // }, [products]);
    
  return (
      <div id="home" className={`bg-blue_white`}>

        <Hero />
        {/* <h2>categories list goes here...</h2> */}

        <ProductMenu />
    </div>
  )
}

export default Home
