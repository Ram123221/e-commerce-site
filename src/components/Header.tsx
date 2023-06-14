import {BsCart3} from "react-icons/bs";
import {AiOutlineBars} from "react-icons/ai";
import { openCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { header_data } from "../data/header_data";
import { initializeShowDeepMenu, initializeShowSubMenu, updateShowMenus,initializeShowMenu, updateDeepMenu, updateShowSubMenu, updateShowMenu, updateHoveredSubMenu, updateHoveredDeepSubMenu, resetHoveredDeepSubMenu, resetHoveredSubMenu } from "./HeaderSlice";
import {TfiAngleDown} from "react-icons/tfi";
import { useEffect } from "react";
import { updateWidthHeight } from "../responsive/WidthHeightSlice";

function Header() {
  const {numOfItems} = useSelector((store:storeType)=>store.cart);
  const {showMenus, showMenu, showSubMenu, showDeepMenu, hoveredDeepMenu, hoveredSubMenu} = useSelector((store:storeType)=>store.header);
  const {width} = useSelector((store:storeType)=>store.width_height_provider);

  const [{ menuDetails:{menu_list} }] = header_data;
  const [{submenuDetails:{submenuList}}] = menu_list;

  const dispatch = useDispatch();

  //initialize the showSubMenu and showDeepMenu array with all false
  useEffect(()=>{
    dispatch(initializeShowMenu(header_data.length));
    dispatch(initializeShowSubMenu(menu_list.length));
    dispatch(initializeShowDeepMenu({submenuLength:submenuList.length, menuLength:menu_list.length}));
    console.log(showDeepMenu);
        
  },[]);

  //for responsiveness
  useEffect(()=>{
    dispatch(updateWidthHeight());

    window.addEventListener("resize",()=>dispatch(updateWidthHeight()));

    return ()=>window.removeEventListener("resize",()=>dispatch(updateWidthHeight()));
  },[]);

  // useEffect(()=>{
  //   console.log(width,height);
  // },[width,height]);

  return (
    <div className="bg-blue_white shadow-xl sticky top-0 left-0 z-10">
      <div className="flex items-center pl-4 pr-8 py-2 lg:px-[unset] lg:max-w-[90%] lg:mx-auto justify-between">

        <div className="flex items-center gap-4 px-4 lg:px-[unset] font-medium">

          <span className="text-2xl cursor-pointer px-2 py-2 sm:hidden" onClick={width<640?()=>dispatch(updateShowMenus()):()=>{}}><AiOutlineBars /></span>

          {/*menu*/}
          <div className={`absolute top-[56px] bg-blue_white left-0 w-full grid ${showMenus?"grid-rows-[1fr]":"grid-rows-[0fr]"} transition-all duration-all sm:static sm:block`}>
            <div className="overflow-hidden sm:flex">
              {header_data.map((menuItems,i)=>{
                const {menuTitleId,menuDetails, menuDetails:{ menu_list},menu_name} = menuItems;
                return (
                  //menuItems
                  <div key={i} className="p-[1rem_40px] pt-[unset] sm:p-[unset] max-h-[calc(100vh_-_56px)] overflow-auto">

                    <h1 className="header text-[1.1rem]" onClick={()=>dispatch(updateShowMenu(menuTitleId-1))}>
                      <span>{menu_name}</span>
                      {
                        menuDetails &&
                        <span><TfiAngleDown /></span>
                      }
                    </h1>

                    {
                      menuDetails &&
                      <div className={`pl-4 sm:w-max sm:pt-[unset] grid ${showMenu[menuTitleId-1]?"grid-rows-[1fr] sm:p-4":"grid-rows-[0fr]"} sm:hover:grid-rows-[1fr] transition-all duration-500 sm:absolute sm:bg-blue_white sm:top-[56px] sm:w-full sm:left-8`} onMouseLeave={()=>dispatch(resetHoveredSubMenu(menu_list.length))}>

                          <div className="overflow-hidden sm:overflow-[unset]">
                            {/* <div className="sm:overflow-auto sm:max-h-screen"> */}
                              {
                                //submenuItems
                                menu_list.map((submenuItems,i)=>{
                                  const {submenuTitleId, submenuName, submenuDetails, submenuDetails:{ submenuList}} = submenuItems;
                                  // console.log(submenuList);
                                  

                                  return (
                                    <div key={i} className="">
                                      
                                      <h1 className="header" onClick={width<640?()=>dispatch(updateShowSubMenu(submenuTitleId-1)):()=>{}} onMouseEnter={width>640?()=>dispatch(updateHoveredSubMenu({id:submenuTitleId-1, length: menu_list.length})):()=>{}}>
                                        <span>{submenuName}</span>
                                        {
                                          submenuDetails &&
                                          <span className="transform -rotate-90"><TfiAngleDown /></span>
                                        }
                                      </h1>

                                      {submenuDetails &&
                                        <div className={`pl-6 grid ${showSubMenu[submenuTitleId-1]?"grid-rows-[1fr] p-2":"grid-rows-[0fr]"} ${hoveredSubMenu[submenuTitleId-1]?"sm:grid-rows-[1fr]":"sm:grid-rows-[0fr]"} transition-all duration-500 sm:bg-blue_white sm:absolute sm:left-full sm:top-0 sm:z-10 sm:pr-6`} onMouseLeave={()=>{dispatch(resetHoveredSubMenu(menu_list.length)); dispatch(resetHoveredDeepSubMenu(submenuList.length))}}>
                                          <div className="overflow-hidden w-max">
                                            {
                                              submenuList.map((submenuItem,i)=>{
                                                const {deepSubmenuDetails, deepSubmenuName, deepsubmenuTitleId, deepSubmenuDetails:{deepSubmenuList }} = submenuItem;
                                                // console.log(deepSubmenuList);
                                                

                                                return (
                                                  <div key={i} className="">

                                                    <h1 className="header text-sm whitespace-nowrap" onClick={width<640?()=>dispatch(updateDeepMenu({submenuIndex:deepsubmenuTitleId-1, menuIndex:submenuTitleId-1})):()=>{}} onMouseEnter={width>640?()=>dispatch(updateHoveredDeepSubMenu({id:deepsubmenuTitleId-1, length: submenuList.length})):()=>{}}>
                                                      <span>{deepSubmenuName}</span>
                                                      {deepSubmenuDetails &&
                                                        <span className="transform -rotate-90"><TfiAngleDown /></span>
                                                      }
                                                    </h1>

                                                    {
                                                      deepSubmenuDetails &&
                                                      <div className={`pl-6 grid ${showDeepMenu[submenuTitleId-1][deepsubmenuTitleId-1]?"grid-rows-[1fr]":"grid-rows-[0fr]"} ${hoveredDeepMenu[deepsubmenuTitleId-1] && hoveredSubMenu[submenuTitleId-1]?"sm:grid-rows-[1fr]":"sm:grid-rows-[0fr]"} transition-all duration-500 sm:absolute sm:left-full sm:top-0 sm:bg-blue_white sm:pr-6`} onMouseLeave={()=>dispatch(resetHoveredDeepSubMenu(submenuList.length))}>

                                                        <div className="overflow-hidden w-max">

                                                          {
                                                            deepSubmenuList.map((deepsubmenuItem,i)=>{
                                                              return (<h1 key={i} className="header text-[0.75rem] whitespace-nowrap">{deepsubmenuItem}</h1>
                                                              )
                                                            })
                                                          }

                                                        </div>
                                                      </div>
                                                    }
                                                  </div>
                                                )
                                              })
                                            }
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  )
                                })
                              }

                            {/* </div> */}
                          </div>

                      </div>
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <span className="text-3xl group cursor-pointer relative inline-block" onClick={()=>dispatch(openCart())}>
          <BsCart3 />

          <span className="text-sm absolute -right-1/2 -top-1/4 bg-primary border-[1px] group-hover:bg-primary_dark transition-all duration-75 border-white p-[6px] grid align-middle items-center content-center justify-items-center rounded-full text-blue_white font-bold leading-none">
            <span className="h-min w-min">
              {numOfItems}

            </span>
          </span>
        </span>

      </div>
    </div>
  )
}

export default Header
