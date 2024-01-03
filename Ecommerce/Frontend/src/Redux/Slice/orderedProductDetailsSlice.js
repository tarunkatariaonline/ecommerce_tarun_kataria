import { createSlice } from '@reduxjs/toolkit'

export const orderedProductDetailsSlice = createSlice({
    name:'orderedProductDetailsSlice',
    initialState:{
     orderedProduct:[],
    },
    reducers:{
        setOrderedProduct:(state,action)=>{
        state.orderedProduct = action.payload
         console.log(state.orderedProduct)
      
        }
    }
})


export const {setOrderedProduct} = orderedProductDetailsSlice.actions;
export default orderedProductDetailsSlice.reducer