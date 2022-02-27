import React, { useState, useEffect } from "react"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

export const getElementRect = (elementID: string, hasParent = true) => {
  const element = document.getElementById(elementID)
  if (element) {
    const rect = element.getBoundingClientRect()
    if (hasParent && element.offsetParent) {
      const parentRect = element!.offsetParent!.getBoundingClientRect()
      return {
        height: rect.height,
        width: rect.width,
        top: rect.top, //rect.top - parentRect.top,
        right: parentRect.right - rect.right,
        bottom: parentRect.bottom - rect.bottom,
        left: rect.left, //rect.left - parentRect.left,
      }
    } else {
      return rect
    }
  } else {
    return null
  }
}
