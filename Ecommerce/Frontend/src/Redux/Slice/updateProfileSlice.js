import { createSlice } from '@reduxjs/toolkit'

export const updateProfileSlice = createSlice({
    name:'updateProfileSlice',
    initialState:{
     updateProfileUsingRedux:false,
    },
    reducers:{
        updateProfileReduxFunc:(state,action)=>{
            state.updateProfileUsingRedux = action.payload
         
        // if(state.updateProfileUsingRedux==="not updated"){
           
        //     state.updateProfileUsingRedux = "updated"
          
        // }else if(state.updateProfileUsingRedux==="updated"){
        //     state.updateProfileUsingRedux = "again updated"
        // }else{
        //     state.updateProfileUsingRedux ="updated"
        // }
   
      
        }
    }
})


export const { updateProfileReduxFunc} = updateProfileSlice.actions;
export default updateProfileSlice.reducer