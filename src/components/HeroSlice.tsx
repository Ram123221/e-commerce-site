import { createSlice } from "@reduxjs/toolkit";
import { hero_data } from "../data/data";

interface heroType{
    id:number,
    img_url:string,
};

export interface heroStateType{
    heroes:heroType[],
    heroShown: number,
};

const initialState:heroStateType = {
    heroes: [],
    heroShown: 0,
};

const HeroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        getHeroes: (state)=>{
            state.heroes = hero_data;
        },
        updateHeroShown: (state, action)=>{
            state.heroShown = action.payload;
        },
        increaseHeroShown: (state)=>{
            if(state.heroShown == state.heroes.length-1){
                state.heroShown = 0;
            }
            else
                state.heroShown+=1;
        },
        decreaseHeroShown: (state)=>{
            if(state.heroShown == 0){
                state.heroShown = state.heroes.length-1;
            }
            else
                state.heroShown-=1;
        }
    }
}
);

export const {getHeroes, updateHeroShown, increaseHeroShown, decreaseHeroShown}= HeroSlice.actions;
export default HeroSlice.reducer;