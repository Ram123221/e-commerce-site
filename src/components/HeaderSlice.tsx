import { createSlice } from "@reduxjs/toolkit";

export interface headerSliceType{
    showMenus: boolean,
    showMenu: boolean[],
    showSubMenu: boolean[],
    showDeepMenu: boolean[],
    hoveredSubMenu: boolean[],
    hoveredDeepMenu: boolean[],
};

const initialState:headerSliceType={
    showMenus: false,
    showMenu: [],
    showSubMenu: [],
    showDeepMenu: [],
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
            state.showDeepMenu = [];
            for(let i=0; i<action.payload; i++){
                state.showDeepMenu.push(false);
                //initialization for hover handling here too
                state.hoveredDeepMenu.push(false);
            }
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
            const {payload} = action;
            state.showDeepMenu[payload] = !state.showDeepMenu[payload];
        },
        resetHoveredSubMenu:(state,action)=>{
            const {payload} = action;
            for(let i=0;i<payload;i++){
                state.hoveredSubMenu[i] = false;
            }
        },
        updateHoveredSubMenu: (state, action)=>{
            const {id, length} = action.payload;
            console.log(id,length);
            
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

