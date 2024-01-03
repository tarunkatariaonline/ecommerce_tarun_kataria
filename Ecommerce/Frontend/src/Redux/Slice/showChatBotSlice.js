import { createSlice } from '@reduxjs/toolkit'


export const showChatBotSlice = createSlice({
    name:'showChatBotSlice',
    initialState:{
     chatBot:false
    },
    reducers:{
        setChatBot:(state,action)=>{
         state.chatBot = action.payload
      
        }
    }
})


export const {setChatBot} = showChatBotSlice.actions;
export default showChatBotSlice.reducer