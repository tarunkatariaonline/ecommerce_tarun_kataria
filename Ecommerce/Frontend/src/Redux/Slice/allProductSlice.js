import { createSlice } from '@reduxjs/toolkit'


export const allProductSlice = createSlice({
    name:'allProductSlice',
    initialState:{
     products:[]
    },
    reducers:{
        getAllProduct:(state,action)=>{
         state.products = action.payload
      
        }
    }
})


export const {getAllProduct} = allProductSlice.actions;
export default allProductSlice.reducer