import React, { useState, useEffect } from "react"
import { contractABI, contractAddress } from "../lib/Constants"
import { ethers } from "ethers"
import { getErrorMessage } from "../lib/FuncLib"
declare global {
  interface Window {
    ethereum: any
  }
}

export enum TransactionFormDataProperties {
  ADDRESS_TO = "addressTo",
  AMOUNT = "amount"
}

export type TransactionFormData = {
  addressTo:string
  amount:string
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
  formData: TransactionFormData
  processing: boolean
  connectWallet: (metamask?: any) => Promise<void>
  sendTransaction: (metamask?: any, connectedAccount?: undefined) => Promise<void>
  handleChange: (e: any, name: string) => void
}
export const TransactionContext =
  React.createContext<TransactionContextInterface | null>(null)

let eth: any

if (typeof window !== "undefined") {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return transactionContract
}

const INITIAL_FORMDATA = {
  addressTo: '',
  amount: ''
}
interface TransactionProviderProps {
  children: React.ReactNode
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<any[]>([])
  const [currentAccount, setCurrentAccount] = useState<any>()
  const [processing, setProcessing] = useState<boolean>(false)
  const [formData, setFormData] = useState<TransactionFormData>(INITIAL_FORMDATA)

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
      if (!metamask) return alert(getErrorMessage("no_connection"))
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      })
      setAccounts(accounts)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error(getErrorMessage("no_eth_object"))
    }
  }
  const verifyWalletConnectionStatus = async (metamask = eth) => {
    try {
      if (!metamask) return alert(getErrorMessage("no_connection"))
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
      throw new Error(getErrorMessage("no_eth_object"))
    }
  }

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try{
      if(!metamask) {
        console.log("metamask missing")
        return alert(getErrorMessage("no_connection"))
      }
      const { addressTo, amount} = formData
      const transactionContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)
      setProcessing(true)
      const final_form = {
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', //520000 Gwei
            value: parsedAmount._hex,
          }
        ]
      }
      console.log(final_form)
      await metamask.request(final_form)
      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER'
      )
      await transactionHash.wait()

      /*await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo
      )*/
    }catch(e){
      console.error(e)
    }finally{
      setProcessing(false)
    }
  }

  const handleChange = (e:any, name:string) => {
    setFormData((prev) => ({...prev, [name]:e.target.value}))
  }

  return (
    <TransactionContext.Provider
      value={{
        accounts,
        currentAccount,
        formData,
        processing,
        connectWallet,
        sendTransaction,
        handleChange
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

