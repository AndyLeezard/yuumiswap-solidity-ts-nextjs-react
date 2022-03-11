import React, { useEffect, useState, useContext } from "react"
import Image from "next/image"
import {
  TransactionContext,
  TransactionContextInterface,
} from "../../contexts/Contexts"
import { client } from "../../lib/SanityClient"
import ethLogo from "../../assets/ethCurrency.png"
import { FiArrowUpRight } from "react-icons/fi"
import styles from "../../styles/TransactionHistory.module.css"

type Props = {}

const TransactionHistory = (props: Props) => {
  const { processing, currentAccount } = useContext(
    TransactionContext
  ) as TransactionContextInterface
  const [transactionHistory, setTransactionHistory] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!processing && currentAccount) {
        const query = `
            *[_type=="users" && _id == "${currentAccount}"] {
              "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
            }`
        const clientRes = await client.fetch(query)
        setTransactionHistory(clientRes[0].transactionList)
      }
    })()
  }, [processing, currentAccount])

  return (
    <div className={styles.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map(
            (
              transaction: {
                txHash: string
                amount: string
                toAddress: string
                timestamp: string | number | Date
              },
              index
            ) => (
              <div className={styles.txHistoryItem} key={index}>
                <div className={styles.txDetails}>
                  <Image src={ethLogo} height={20} width={15} alt="eth" />
                  {transaction.amount} Ξ sent to{" "}
                  <span className={styles.toAddress}>
                    {transaction.toAddress.substring(0, 6)}
                  </span>
                </div>{" "}
                on{" "}
                <div className={styles.txTimestamp}>
                  {new Date(transaction.timestamp).toLocaleString()}
                </div>
                <div className={styles.etherscanLink}>
                <a
                    href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.etherscanLink}
                  >
                      View on Etherscan
                      <FiArrowUpRight/>
                  </a>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default TransactionHistory
