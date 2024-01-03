import { createSlice } from '@reduxjs/toolkit'

export const updateAllUsersAdminSlice = createSlice({
    name:'updateAllUsersAdminSlice',
    initialState:{
     updateAllUsersAdminUsingRedux:false,
    },
    reducers:{
        updateAllUsersAdminReduxFunc:(state,action)=>{
            state.updateAllUsersAdminUsingRedux = action.payload
         
      
      
        }
    }
})


export const { updateAllUsersAdminReduxFunc} = updateAllUsersAdminSlice.actions;
export default updateAllUsersAdminSlice.reducer