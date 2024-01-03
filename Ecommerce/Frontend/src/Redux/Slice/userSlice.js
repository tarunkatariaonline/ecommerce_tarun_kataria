import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'userSlice',
    initialState:{
     user:false,
    },
    reducers:{
        setUser:(state,action)=>{
        state.user = action.payload
   
      
        }
    }
})


export const {setUser} = userSlice.actions;
export default userSlice.reducer