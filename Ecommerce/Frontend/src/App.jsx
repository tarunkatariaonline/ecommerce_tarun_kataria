import React from 'react';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import {
  
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './Components/Header';
import Home from './Components/Home';

import ProductPage from './Components/Product/ProductPage';

import {  useSelector } from 'react-redux'
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import CreateProduct from './Components/Admin/CreateProduct';
import AllUsersAdmin from './Components/Admin/AllUsersAdmin';
import AllProductsAdmin from './Components/Admin/AllProductsAdmin/AllProductsAdmin';
import ForgotPassword from './Components/User/ForgotPassword';
import ChangePassword from './Components/User/ChangePassword';

import ShippingPage from './Components/OrderPage/ShippingPage';
import OrderNow from './Components/OrderPage/OrderNow';
import Cart from './Components/Product/Cart';
import MyOrders from './Components/OrderPage/MyOrders';
import OrderdItem from './Components/OrderPage/OrderdItem';
import AllOrdersAdmin from './Components/Admin/AllOrdersAdmin/AllOrdersAdmin';
import Account from './Components/User/Account';
import ForgotPasswordUpdate from './Components/User/ForgotPasswordUpdate';


import useUserDetails from './Hooks/useUserDetails';



import AdminDashboard from './Components/Admin/AdminDashboard';

import ProtectedRoute from './Components/ProtectedRoute';

import Logout from './Components/User/Logout';
import PageNotFount from './Components/PageNotFount';
import Footer from './Components/Footer'
import ChatBotBtn from './Components/ChatBot/ChatBotBtn';
import ChatBotBox from './Components/ChatBot/ChatBotBox';
function App() {
  const defaultTheme = createTheme(); 
useUserDetails()

 
const user = useSelector(state=>state.isAuthReducer.user)
const userforloginandregister = useSelector(state=>state.userReducer.user)
console.log(user)


  return (


    <ThemeProvider theme={defaultTheme} >
    
   
    <ChakraProvider theme={theme}>

    
      <Router>
      <Header />
      

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='*' element={<PageNotFount/>} />
          
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/user/login' element={ (userforloginandregister)? <Navigate to={'/'}/> : <Login/>}/>
          <Route path='/user/signup' element={ (userforloginandregister)? <Navigate to={'/'}/> :<Signup/>}/>
         
           
          
          <Route path='/user/forgotpassword'element={<ForgotPassword/>}/>
          <Route path='/user/logout'element={<Logout/>}/>

         
         
          <Route path='/user/account' element={<Account/>}/>
     <Route element={<ProtectedRoute  isAuth={(user)?true:false} adminRoute={false}  />} >

   
          <Route path='/user/changepassword' element={<ChangePassword/>}  />
         
          <Route path='/order/shippingdetails' element={<ShippingPage/>}/>
          <Route path='/order/myorders' element={<MyOrders/>}/>
          <Route path='/order/ordernow' element={<OrderNow/>}/>
          <Route path='/order/myorders/:id' element={<OrderdItem/>}/>
          </Route>
         
         

       
          <Route element={<ProtectedRoute  isAuth={(user)?true:false} adminRoute={true} isAdmin={user?.isAdmin} />} >
          
          <Route path='/admin/allorders' element={<AllOrdersAdmin/>} />
          <Route path='admin/dashboard' element={ <AdminDashboard/>}/>
          <Route path='admin/allusers' element={<AllUsersAdmin/>} /> 
          <Route path='admin/createproduct' element={<CreateProduct/>} />
          <Route path='admin/allproducts' element={<AllProductsAdmin/>} />
         
          </Route>
         
         
          
          <Route path='/cart' element={<Cart/>}/>
         



          
        
        

        
          
          <Route path='/user/forgotpassword/reset/:token' element={<ForgotPasswordUpdate/>} />
          

          </Routes>   
          <ChatBotBox/>
          <ChatBotBtn/>


          <Footer/>
          
      </Router>
     
    
    
    </ChakraProvider>

    </ThemeProvider>
  );
}

export default App;
