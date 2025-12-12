import {useState} from "react";

export function useSignIn(){
    const [signInRequest,setSignInRequest] = useState({email:"herrera1@gmail.com",password:"herrera1"})
    const setPassword = (password)=>{
        setSignInRequest((prev)=>({
            ...prev,
            password: password
        }))
    }
    const setEmail = (email)=>{
        setSignInRequest((prev)=>({
            ...prev,
            email: email
        }))
    }

    return{signInRequest,setEmail,setPassword}
}