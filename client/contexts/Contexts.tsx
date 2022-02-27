import React, { useState, useEffect } from "react"

declare global {
  interface Window {
    ethereum: any
  }
}

export interface ViewportContextInterface {
  screenHeight: number
  screenWidth: number
}

export const ViewportContext =
  React.createContext<ViewportContextInterface | null>(null)

export interface TransactionContextInterface {
  accounts: any[]
  currentAccount: any
  connectWallet: (metamask?: any) => Promise<void>
}
export const TransactionContext =
  React.createContext<TransactionContextInterface | null>(null)

let eth: any

if (typeof window !== "undefined") {
  eth = window.ethereum
}

interface TransactionProviderProps {
  children: React.ReactNode
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState([])
  const [currentAccount, setCurrentAccount] = useState()

  /**
   * for debugging purposes
   */
  useEffect(() => {
    console.log({ accounts, currentAccount })
  }, [accounts, currentAccount])

  useEffect(() => {
    verifyWalletConnectionStatus()
  }, [])

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install Metamask.")
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      })
      setAccounts(accounts)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error("No Ethereum object")
    }
  }
  const verifyWalletConnectionStatus = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install Metamask")
      const accounts = await metamask.request({
        method: "eth_accounts",
      })
      if (accounts.length) {
        setAccounts(accounts)
        setCurrentAccount(accounts[0])
        console.log("wallet status : connected")
      }
    } catch (error) {
      console.error(error)
      throw new Error("No Ethereum object")
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        accounts,
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
