import { createSlice } from '@reduxjs/toolkit'

export const updateProductSlice = createSlice({
    name:'updateProductSlice',
    initialState:{
     updateProductUsingRedux:false,
    },
    reducers:{
        updateProductReduxFunc:(state,action)=>{
            state.updateProductUsingRedux = action.payload
         
        // if(state.updateProductUsingRedux==="not updated"){
           
        //     state.updateProductUsingRedux = "updated"
          
        // }else if(state.updateProductUsingRedux==="updated"){
        //     state.updateProductUsingRedux = "again updated"
        // }else{
        //     state.updateProductUsingRedux ="updated"
        // }
   
      
        }
    }
})


export const { updateProductReduxFunc} = updateProductSlice.actions;
export default updateProductSlice.reducer