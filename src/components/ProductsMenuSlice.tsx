import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("product-menu/requestStatus", async () => {
  try{
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    // console.log(products);
    return products;
  }
  catch(err){
    console.log(err + " occurred!!")
  }
 });

//this returns an action creator which means fetchCategories below is an action creator, when this is called by dispatch method async callback is called and returned value is set to payload of action
export const fetchCategories = createAsyncThunk("category/requestStatus",async ()=>{
  try{
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();
    // console.log(categories);
    return categories;
  }
  catch(err){
    console.log(err+"occurred!!");
  }
});

export const fetchSingleProductById = createAsyncThunk("singleProduct/requestStatus", async (id:string|number)=>{
  try{
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const single_product = await response.json();
    return single_product;
  }
  catch(err){
    console.log(`single product by ${id} could not be fetched due to this ${err} error!!!`);
  }
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
  singleProductById:productType,
  popupsShown: boolean[],
  activeCategory: string,
  isLoading: boolean,
  isSingleProductLoading: boolean,
};

const initialState:productsType = {
  products: [],
  categories: [],
  productsByCategory: [],
  singleProductById:{
    id: 0,
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    }
  },
  popupsShown: [],
  activeCategory: "all",//initial active category set as "all"
  isLoading: true,
  isSingleProductLoading: true,
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
      builder.addCase(fetchProducts.pending, (state) => {
        //loading truth value will be false here //do it later on
        // console.log("pending");
        state.isLoading = true;
      }),

      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log(action);
        state.products = action.payload;
        //to set the initial productsCopied array to products array after it is returned
        state.productsByCategory = state.products;
        state.isLoading = false;
      }),

      builder.addCase(fetchProducts.rejected, (state) => {
        // console.log("rejected");
        //below code is unnecessary to do cuz it will be handled in the beginning already
        state.isLoading = true;
      }),

      //reducers to handle fetching categories
      builder.addCase(fetchCategories.pending, ()=>{
        console.log("pending");
      }),

      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      }),

      builder.addCase(fetchCategories.rejected, () => {
        console.log("rejected");
      }),

      //async thunk for fetching single product api call
      builder.addCase(fetchSingleProductById.rejected, ()=>{
        console.log("rejected");
      }),

      builder.addCase(fetchSingleProductById.fulfilled, (state, action)=>{
        //if request was successful, the returned values goes to the payload property of action object
        state.singleProductById = action.payload;
        // console.log(state.singleProductById);

        state.isSingleProductLoading = false;
      }),

      builder.addCase(fetchSingleProductById.pending, (state)=>{
        // console.log("pending");
        state.isSingleProductLoading = true;
      })
  }

});

export default ProductMenuSlice.reducer;
export const { getProductsByCategory, showPopup, hidePopup, setAllToFalse, activateCategory } = ProductMenuSlice.actions;


