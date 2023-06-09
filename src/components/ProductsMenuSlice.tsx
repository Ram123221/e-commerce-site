import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("product-menu/requestStatus", async () => {
 return await fetch('https://fakestoreapi.com/products')
    .then(products => products.json())
    .then(productsArr => productsArr)
    .catch((error) => `${error} occurred`);
});

//this returns an action creator which means fetchCategories below is an action creator, when this is called by dispatch method async callback is called and returned value is set to payload of action
export const fetchCategories = createAsyncThunk("category/requestStatus",async ()=>{
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await response.json();
  // console.log(categories);
  return categories;
});

export interface productType{
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string,
  rating: {
    rate: number,
    count: number,
  }
};

export interface productsType{
  products: productType[],
  categories: string[],
  productsByCategory: productType[],
  popupsShown: boolean[],
  activeCategory: string,
};

const initialState:productsType = {
  products: [],
  categories: [],
  productsByCategory: [],
  popupsShown: [],
  activeCategory: "all",//initial active category set as "all"
};

const ProductMenuSlice = createSlice({
  name: "product-menu",
  initialState,
  reducers: {
    getProductsByCategory: (state,action)=>{
      const {payload} = action;
      // console.log("called",state.products)

      if(payload=="all"){
          state.productsByCategory = state.products;
          // console.log("all", state.products, state.productsByCategory);
      }
      else{
        const newArr = state.products.filter(product=>product.category==payload);
        state.productsByCategory = newArr;
      }
    },
    //for popup of product added to cart animation
    showPopup: (state,action)=>{
      const {payload} = action;
      state.popupsShown[payload] = true;
    },
    setAllToFalse: (state)=>{
      state.popupsShown= [];
      for(let i=0; i<state.productsByCategory.length; i++){
        state.popupsShown.push(false);
      }
    },
    hidePopup: (state,action)=>{
      const {payload} = action;
      state.popupsShown[payload] = false;
    },
    //category color set upon click
    activateCategory: (state,action)=>{
      state.activeCategory = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, () => {
      //loading truth value will be false here //do it later on
      console.log("pending");
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log(action);
        state.products = action.payload;
        //to set the initial productsCopied array to products array after it is returned
        state.productsByCategory = state.products;
      }),
      builder.addCase(fetchProducts.rejected, () => {
        console.log("rejected");
      }),
      //reducers to handling fetching categories
      builder.addCase(fetchCategories.pending, ()=>{
        console.log("pending");
      }),
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      }),
      builder.addCase(fetchCategories.rejected, () => {
        console.log("rejected");
      })
  }

});

export default ProductMenuSlice.reducer;
export const { getProductsByCategory, showPopup, hidePopup, setAllToFalse, activateCategory } = ProductMenuSlice.actions;


