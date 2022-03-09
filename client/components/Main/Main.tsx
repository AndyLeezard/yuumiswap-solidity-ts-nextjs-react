import React, { useContext } from "react"
import Image from "next/Image"
import { RiSettings3Fill } from "react-icons/ri"
import { AiOutlineDown } from "react-icons/ai"
import ethLogo from "../../assets/eth.png"
import styles from "../../styles/Main.module.css"
import { navState } from "../../types/Types"
import { TransactionContext, TransactionContextInterface, TransactionFormDataProperties } from "../../contexts/Contexts"

type Props = {}

const Main = (props: Props) => {
  const { formData , handleChange, sendTransaction, processing } = useContext(TransactionContext) as TransactionContextInterface
  
  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { addressTo, amount } = formData
    console.log({ addressTo, amount})
    e.preventDefault()
    if(processing){
      console.log("the function is still processing the last request")
      return
    }
    if(!addressTo || !amount) {
      console.log("either address or amount is missing !")
      return
    }
    sendTransaction()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.form_header}>
          <div>{navState.SEND}</div>
          <div>
            <RiSettings3Fill />
          </div>
        </div>
        <div className={styles.transfer_prop_container}>
          <input
            type="text"
            className={styles.transfer_prop_input}
            placeholder="0.0"
            pattern="^[0-9]*[.,]?[0-9]*$"
            value={formData.amount}
            onChange={(e) => handleChange(e, TransactionFormDataProperties.AMOUNT)}
          />
          <div className={styles.currency_selector}>
            <div className={styles.currency_selector_content}>
              <div className={styles.currency_selector_icon}>
                <Image
                  src={ethLogo}
                  alt="currency logo"
                  height={20}
                  width={20}
                />
              </div>
              <div className={styles.currency_selector_ticker}>ETH</div>
              <AiOutlineDown className={styles.currency_selector_arrow} />
            </div>
          </div>
        </div>
        <div className={styles.transfer_prop_container}>
          <input
            type="text"
            className={styles.transfer_prop_input}
            placeholder="0x ..."
            value={formData.addressTo}
            onChange={(e) => {
              handleChange(e, TransactionFormDataProperties.ADDRESS_TO)
            }}
          />
          <div className={styles.currency_selector}></div>
        </div>
        <div className={styles.confirm_button} onClick={handleSubmit}>
          {processing ? "Processing":"Confirm"}
        </div>
      </div>
    </div>
  )
}

export default Main
