import React from 'react'
import { css } from "@emotion/react"
import { MoonLoader } from "react-spinners"
import styles from "../../styles/TransactionLoader.module.css"

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`

type Props = {}

const TransactionLoader = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Transaction in progress...
      </div>
      <MoonLoader color={'#fff'} loading={true} css={cssOverride}/>
    </div>
  )
}

export default TransactionLoader