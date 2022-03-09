import React, { useState, useEffect, useContext } from "react"
import { getElementRect } from "../../lib/FuncLib"
import {
  ViewportContext,
  ViewportContextInterface,
} from "../../contexts/Contexts"
import { navState } from "../../types/Types"

export const nav_buttons = [navState.SEND, navState.POOL, navState.VOTE]

interface NavButtonProps {
  name: navState
  selectedNav: navState
  className: string
  className_active?: string
  clickCallback: React.Dispatch<React.SetStateAction<navState>>
}

export const NavButton: React.FC<NavButtonProps> = (props) => {
  return (
    <div
      id={props.name}
      className={`${props.className} ${
        props.selectedNav === props.name ? props.className_active : ""
      }`}
      onClick={() => props.clickCallback(props.name)}
    >
      {props.name}
    </div>
  )
}

interface StaticButtonProps {
  link?: string
  className: string
  icon: JSX.Element
}

export const StaticButton: React.FC<StaticButtonProps> = ({
  link,
  className,
  icon,
}) => {
  if (!link) {
    return <div className={className}>Charts {icon}</div>
  } else {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <div className={className}>Charts {icon}</div>
      </a>
    )
  }
}

interface ActiveButtonBackgroundProps {
  selectedNav: navState
  className: string
  render?: boolean
}

export const ActiveButtonBackground: React.FC<ActiveButtonBackgroundProps> = ({
  selectedNav,
  className,
  render,
}) => {
  const globalContext = useContext(ViewportContext) as ViewportContextInterface
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const current_button_rect = getElementRect(selectedNav)
    if (current_button_rect) {
      setRect(current_button_rect as DOMRect)
    }
    return () => {}
  }, [selectedNav, globalContext.screenHeight, globalContext.screenWidth])

  return (
    <>
      {rect ? (
        <div
          id={"navbg"}
          className={`${className}`}
          style={{
            opacity: render ? 1 : 0,
            width: rect.width,
            left: rect.left + rect.width / 2,
          }}
        />
      ) : (
        <></>
      )}
    </>
  )
}
