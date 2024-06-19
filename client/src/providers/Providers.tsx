import { appStore } from "@src/store/appStore"
import React from "react"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"

interface ProviderProps {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps ) => {
  return (
    <Provider store={appStore}>
        {children}
        <Toaster />
    </Provider>
  )
}
