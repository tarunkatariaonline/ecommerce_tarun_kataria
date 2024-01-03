import { createSlice } from '@reduxjs/toolkit'

export const shippingInfoSlice = createSlice({
    name:'shippingInfoSlice',
    initialState:{
     shippingInfo:{},
    },
    reducers:{
        setShippingInfo:(state,action)=>{
        state.shippingInfo = action.payload
         console.log(state.shippingInfo)
      
        }
    }
})


export const {setShippingInfo} = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer