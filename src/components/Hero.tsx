import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { useEffect } from "react";
import { getHeroes, increaseHeroShown, decreaseHeroShown } from "./HeroSlice";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

function Hero() {
  const dispatch = useDispatch();
  const {heroes, heroShown} = useSelector((store:storeType)=>store.hero);
  
  useEffect(()=>{
    dispatch(getHeroes());
  },[]);

  
  useEffect(()=>{
    const interval = setInterval(()=>{
      dispatch(increaseHeroShown());
  }, 4000);

  return ()=>clearInterval(interval);
  },[heroShown]);

  return (
    <div className="mb-16 relative lg:max-w-[90%] lg:mx-auto">{/*left right arrow is to be place here*/}
      <div className={`overflow-hidden`}> 
        <div className={`grid grid-cols-${heroes.length} auto-cols-[100%] grid-flow-col transition-all duration-75`} style={{transform: `translateX(-${heroShown * 100}%)`}}>
          {heroes.map(hero=>{
            const { id, img_url} = hero;
            return (
              <img src={img_url} key={id} alt={`${id}.jpg`} className="min-h-[230px] object-cover object-left-top" />
            )
          })}
        </div>
      </div>

      <span onClick={()=>dispatch(decreaseHeroShown())} className="cursor-pointer text-xl absolute top-1/2 text-blue_white bg-primary hover:bg-primary_dark transition-all duration-75 rounded-full p-3 left-1 transfrom -translate-y-1/2 items-center justify-items-center"><FaAngleLeft /></span>
      <span onClick={()=>dispatch(increaseHeroShown())} className="cursor-pointer text-xl absolute top-1/2 text-blue_white bg-primary hover:bg-primary_dark transition-all duration-75 rounded-full p-3 right-1 transfrom -translate-y-1/2 items-center justify-items-center"><FaAngleRight /></span>
    </div>
  )
}

export default Hero;
