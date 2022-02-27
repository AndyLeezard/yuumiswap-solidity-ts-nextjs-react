import React from "react"

export interface GlobalContextInterface {
  screenHeight: number
  screenWidth: number
}

export const GlobalContext = React.createContext<GlobalContextInterface | null>(
  null
)
