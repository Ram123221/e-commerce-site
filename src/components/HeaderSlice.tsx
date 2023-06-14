import { createSlice } from "@reduxjs/toolkit";
import { header_data } from "../data/header_data";

const [{ menuDetails:{menu_list} }] = header_data;
const [{submenuDetails:{submenuList}}] = menu_list;

export interface headerSliceType{
    showMenus: boolean,
    showMenu: boolean[],
    showSubMenu: boolean[],
    showDeepMenu: boolean[][],
    hoveredSubMenu: boolean[],
    hoveredDeepMenu: boolean[],
};

const initialState:headerSliceType={
    showMenus: false,
    showMenu: [],
    showSubMenu: [],
    showDeepMenu: [...Array(menu_list.length)].map(_=>[...Array(submenuList.length)]),//defining two dimensional array
    hoveredSubMenu: [],
    hoveredDeepMenu: [],
};

const HeaderSlice = createSlice({
    name: "header",
    initialState,
    reducers:{
        updateShowMenus: (state)=>{
            state.showMenus = !state.showMenus;
        },
        initializeShowMenu: (state,action)=>{
            state.showMenu = [];
            for(let i=0; i<action.payload; i++){
                state.showMenu.push(false);
            }
            
        },
        initializeShowSubMenu: (state,action)=>{
            state.showSubMenu = [];
            for(let i=0; i<action.payload; i++){
                state.showSubMenu.push(false);
                //initialization for hover handling here too
                state.hoveredSubMenu.push(false);
            }
            
        },
        initializeShowDeepMenu: (state,action)=>{
            const {menuLength, submenuLength} = action.payload;

            state.showDeepMenu = [...Array(menuLength)].map(_=>[...Array(submenuLength)]);
            for(let i=0; i<menuLength; i++){
                for(let j=0; j<submenuLength; j++){
                    state.showDeepMenu[i][j] = false;
                    //initialization for hover handling here too
                }
                state.hoveredDeepMenu.push(false);
            }
            console.log(state.showDeepMenu);
            
        },
        updateShowMenu: (state,action)=>{
            const {payload} = action;
            state.showMenu[payload] = !state.showMenu[payload];
        },
        updateShowSubMenu: (state,action)=>{
            const {payload} = action;
            state.showSubMenu[payload] = !state.showSubMenu[payload];
        },
        updateDeepMenu: (state,action)=>{
            const {menuIndex, submenuIndex} = action.payload;
            state.showDeepMenu[menuIndex][submenuIndex] = !state.showDeepMenu[menuIndex][submenuIndex];
        },
        resetHoveredSubMenu:(state,action)=>{
            const {payload} = action;
            for(let i=0;i<payload;i++){
                state.hoveredSubMenu[i] = false;
            }
        },
        updateHoveredSubMenu: (state, action)=>{
            const {id, length} = action.payload;
            
            //reset
            for(let i=0; i<length; i++){
                state.hoveredSubMenu[i]= false;
            }

            state.hoveredSubMenu[id] = true;
        },
        resetHoveredDeepSubMenu:(state,action)=>{
            const {payload} = action;
            for(let i=0;i<payload;i++){
                state.hoveredDeepMenu[i] = false;
            }
        },
        updateHoveredDeepSubMenu: (state, action)=>{
            const {id, length} = action.payload;
            //reset
            for(let i=0; i<length; i++){
                state.hoveredDeepMenu[i]= false;
            }

            state.hoveredDeepMenu[id] = true;
        },
        
    }
});

export default HeaderSlice.reducer;
export const {  initializeShowDeepMenu, initializeShowSubMenu, initializeShowMenu, updateShowMenus,updateShowMenu, updateDeepMenu, updateShowSubMenu, updateHoveredSubMenu, updateHoveredDeepSubMenu, resetHoveredDeepSubMenu, resetHoveredSubMenu} = HeaderSlice.actions;

