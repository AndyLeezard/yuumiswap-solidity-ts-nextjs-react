import React from "react"
import Image from "next/image"
import { RiSettings3Fill } from "react-icons/ri"
import { AiOutlineDown } from "react-icons/ai"
import ethLogo from "../../assets/eth.png"
import styles from "../../styles/Main.module.css"
import { navState } from "../../types/Types"

type Props = {}

const Main = (props: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    str: string
  ) => {}
  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.form_header}>
          <div>{navState.SWAP}</div>
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
            onChange={(e) => handleChange(e, "amount")}
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
            onChange={(e) => {
              handleChange(e, "addressTo")
            }}
          />
          <div className={styles.currency_selector}></div>
        </div>
        <div className={styles.confirm_button} onClick={handleSubmit}>
          Confirm
        </div>
      </div>
    </div>
  )
}

export default Main
