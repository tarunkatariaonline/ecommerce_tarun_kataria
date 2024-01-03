import { configureStore } from '@reduxjs/toolkit'
import allProductReducer from '../Slice/allProductSlice';
import shippingInfoReducer from '../Slice/shippingInfoSlice';

import orderedProductDetailsReducer from '../Slice/orderedProductDetailsSlice';
import cartReducer from '../Slice/cartSlice';

import userReducer from '../Slice/userSlice';
import isAuthReducer from '../Slice/isAuthSlice';
import updateProfileReducer from '../Slice/updateProfileSlice';
import updateProductReducer from '../Slice/updateProductSlice';
import updateAllProductsAdminReducer from '../Slice/updateAllProductsAdminSlice';
import updateAllUsersAdminReducer from '../Slice/updateAllUsersAdminSlice';
import showChatBotReducer from '../Slice/showChatBotSlice';
import chatBotChatsReducer from '../Slice/ChatBotChatsSlice';
export const store = configureStore({
  reducer: {
   allProductReducer: allProductReducer,
   shippingInfoReducer:shippingInfoReducer,
   orderedProductDetailsReducer:orderedProductDetailsReducer,
   cartReducer:cartReducer,
   userReducer:userReducer,
   isAuthReducer:isAuthReducer,
   updateProfileReducer,
   updateProductReducer,
   updateAllProductsAdminReducer,
   updateAllUsersAdminReducer,
   showChatBotReducer,
   chatBotChatsReducer
   
  },
})

