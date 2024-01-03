
import {  createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
name:"cartSlice",
initialState:{
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
},
 reducers:{
    setcart:(state,action)=>{
      
     const AlreadyAddedToCart = state.cart.find((item)=>item._id===action.payload._id)
     
     if(AlreadyAddedToCart){

      if(AlreadyAddedToCart.quantity+action.payload.qunatity>AlreadyAddedToCart.Stock){
         AlreadyAddedToCart.quantity = AlreadyAddedToCart.Stock
       
         return;
      }
      AlreadyAddedToCart.quantity = AlreadyAddedToCart.quantity+action.payload.qunatity;
      
      return ;
     }


    
       state.cart.push({
         _id:action.payload._id,
         name:action.payload.name,
         quantity:action.payload.qunatity,
         price:action.payload.price,
         Stock:action.payload.Stock,
         category:action.payload.category,
         image:action.payload.image
       })
       
       
       return
      },
      removecart:(state,action)=>{
        const cartR = state.cart.find(item =>item._id===action.payload._id)
        if(cartR.quantity===0){
         state.cart = state.cart.filter((cart)=>{ return cart._id!==action.payload._id})
      
      }
        if(cartR){
         cartR.quantity-= 1;
    
         if(cartR.quantity===0){
            state.cart = state.cart.filter((cart)=>{ return cart._id!==action.payload._id})
         
         }
        }
      
    },
    


    
 
 }

})

export default cartSlice.reducer;
export const {setcart,removecart} = cartSlice.actions;