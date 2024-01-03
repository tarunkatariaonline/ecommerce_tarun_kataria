import { useEffect, useState } from "react"

const useOnline = ()=>{
    const [status,setStatus] = useState(true)

useEffect(()=>{
   const handleOnline =  window.addEventListener("online", () => {
        setStatus(true)
      });
    const handleOffline=  window.addEventListener("offline", () => {
        setStatus(false)
      });

      return ()=>{

        window.removeEventListener("online",handleOnline)

          window.removeEventListener("offline",handleOffline);
      }


},[])
return status



}

export default useOnline