import { createSlice } from '@reduxjs/toolkit'

export const updateAllProductsAdminSlice = createSlice({
    name:'updateAllProductsAdminSlice',
    initialState:{
     updateAllProductsAdminUsingRedux:false,
    },
    reducers:{
        updateAllProductsAdminReduxFunc:(state,action)=>{
            state.updateAllProductsAdminUsingRedux = action.payload
         
    
      
        }
    }
})


export const { updateAllProductsAdminReduxFunc} = updateAllProductsAdminSlice.actions;
export default updateAllProductsAdminSlice.reducer