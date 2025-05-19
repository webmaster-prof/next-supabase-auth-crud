'use client';

import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppUtilsType {
    isLoggedIn: boolean
    setIsLoggedIn: (state: boolean) => void
    setAuthToken: (state: null) => void
    userFrofile: null
    setUserProfile: (state: null) => void
    setIsLoading: (state: boolean) => void
}

const AppUtilsContext = createContext<AppUtilsType | undefined>(undefined)


export const AppUtilsProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<null | string>(null)
    const [userFrofile, setUserProfile] = useState<null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
         const token = localStorage.getItem("access_token")
         const userProfile = localStorage.getItem("user_profile")

         if(token){
            setAuthToken(token)
            setIsLoggedIn(true)
            setUserProfile(JSON.parse(userProfile))
         }
    }, [])


    return (
    <AppUtilsContext.Provider
       value={{
           isLoggedIn,
           setIsLoggedIn,
           setAuthToken,
           userFrofile,
           setUserProfile,
           setIsLoading,
       }}
    >
        {isLoading ? <Loader/> : children}
    </AppUtilsContext.Provider>
    )
}

export const myAppHook = () => {
    const context = useContext(AppUtilsContext)
    if(!context){
        throw new Error("App Utils functions must be wrapped inside AppUtils Provider")
    }
    return context
}

