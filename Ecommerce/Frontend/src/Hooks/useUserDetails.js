import { useEffect} from "react"

import axios from "axios"

import { useDispatch ,useSelector} from 'react-redux';
import { setUser } from "../Redux/Slice/userSlice";
import { setIsAuth } from "../Redux/Slice/isAuthSlice";
import { updateProfileReduxFunc } from "../Redux/Slice/updateProfileSlice";
import { ACCOUNT } from "../Components/Apis/Apis";
const useUserDetails = ()=>{
   
const dispatch  = useDispatch()
const updateProfileRe = useSelector(state=>state.updateProfileReducer.updateProfileUsingRedux)
useEffect(()=>{
    const fetchUserDetails =async () =>{
        try{  

          
            
            const data = await axios.get(ACCOUNT,{
           
              withCredentials:true,

                
                
            })
       
        console.log("hello")
         dispatch( setUser(data.data))
         dispatch(setIsAuth(true))
  
    
        }catch(err){
            
          dispatch(setIsAuth(false))
          
         
    
          
    
    
        }
    }
fetchUserDetails()
},[dispatch,updateProfileRe])




}


export default useUserDetails;