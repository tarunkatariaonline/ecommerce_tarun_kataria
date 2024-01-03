import { createSlice } from '@reduxjs/toolkit'

export const isAuthSlice = createSlice({
    name:'isAuthSlice',
    initialState:{
     user:true,
    },
    reducers:{
        setIsAuth:(state,action)=>{
        state.user = action.payload
   
      
        }
    }
})


export const {setIsAuth} = isAuthSlice.actions;
export default isAuthSlice.reducer