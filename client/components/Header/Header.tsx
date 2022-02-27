import React, { useState } from "react"
import Image from "next/Image"
import { FiArrowUpRight } from "react-icons/fi"
import { AiOutlineDown } from "react-icons/ai"
import { HiDotsHorizontal } from "react-icons/hi"
import ethLogo from "../../assets/eth.png"
import Logo from "../../assets/logo.png"
import styles from "../../styles/Header.module.css"
import * as Resources from "./Resources"

const Header: React.FC<{}> = () => {
  const [selectedNav, setSelectedNav] = useState(Resources.navState.SWAP)
  const [hover, setHover] = useState(false)

  const connectWallet = () => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image src={Logo} alt="Logo" height={40} width={40} />
      </div>
      <div
        className={styles.nav}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Resources.ActiveButtonBackground
          selectedNav={selectedNav}
          className={styles.nav_bg}
          render={hover}
        />
        <div className={styles.nav_items_container}>
          {Resources.nav_buttons.map((el) => (
            <Resources.NavButton
              key={el}
              name={el}
              className={styles.nav_item}
              className_active={styles.nav_active_item}
              selectedNav={selectedNav}
              clickCallback={setSelectedNav}
            />
          ))}
          <Resources.StaticButton
            link={"https://info.uniswap.org/"}
            className={styles.nav_item}
            icon={<FiArrowUpRight />}
          />
        </div>
      </div>
      <div className={styles.buttons_container}>
        <div className={`${styles.button} ${styles.button_padding}`}>
          <div className={styles.button_icon_container}>
            <Image src={ethLogo} alt="eth logo" height={20} width={20} />
          </div>
          <span>Ethereum</span>
          <div className={styles.button_icon_container}>
            <AiOutlineDown />
          </div>
        </div>
        <div
          onClick={() => connectWallet()}
          className={`${styles.button} ${styles.button_padding}`}
        >
          <div className={styles.button_accent}>Connect Wallet</div>
        </div>
        <div
          className={`${styles.button} ${styles.button_padding} ${styles.button_menu}`}
        >
          <div className={styles.button_icon_container}>
            <HiDotsHorizontal className={styles.button_menu_icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
