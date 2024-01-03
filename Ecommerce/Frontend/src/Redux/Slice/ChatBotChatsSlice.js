import { createSlice } from '@reduxjs/toolkit'


export const chatBotChatsSlice = createSlice({
    name:'chatBotChatsSlice',
    initialState:{
     chats:[]
    },
    reducers:{
        getchatBotChats:(state,action)=>{
         state.chats.push(action.payload)
      
        }
    }
})


export const {getchatBotChats} = chatBotChatsSlice.actions;
export default chatBotChatsSlice.reducer