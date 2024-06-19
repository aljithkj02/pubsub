import { appStore } from "@src/store/appStore"
import React from "react"
import { Provider } from "react-redux"

interface ProviderProps {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps ) => {
  return (
    <Provider store={appStore}>
        {children}
    </Provider>
  )
}
