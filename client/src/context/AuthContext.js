import { createContext, useEffect, useReducer } from "react"

const initState={
    loading:false,
    error:false,
    user:JSON.parse(localStorage.getItem('user')) || null
}
export const AuthContext=createContext(initState)

const AuthReduce=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return {
                loading:true,
                error:false,
                user:null
            }
        case "LOGIN_SUCCESS":
            return {
                loading:false,
                error:false,
                user:action.payload
            }
        case "LOGIN_FAILURE":
            return {
                loading:false,
                error:true,
                user:null
            }
        case "LOGOUT":
            return {
                loading:false,
                error:false,
                user:null
            }
        default:
            return state;
    }
}
export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReduce,initState)
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(state.user))
    },[state?.user])
    return(
        <AuthContext.Provider value={{user:state.user,loading:state.loading,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}