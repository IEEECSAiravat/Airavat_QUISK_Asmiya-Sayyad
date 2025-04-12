"use client"

import React, { useState, useRef, useEffect } from "react"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  numInputs: number
  renderInput: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode
}

export function OtpInput({ value, onChange, numInputs, renderInput }: OtpInputProps) {
  const [activeInput, setActiveInput] = useState(0)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const getOtpValue = () => (value ? value.toString().split("") : [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (!val) {
      return
    }

    const newValue = val.substring(val.length - 1)
    const otpValue = [...getOtpValue()]
    otpValue[index] = newValue

    onChange(otpValue.join(""))

    if (index < numInputs - 1) {
      setActiveInput(index + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      const otpValue = [...getOtpValue()]
      otpValue[index] = ""
      onChange(otpValue.join(""))

      if (index > 0) {
        setActiveInput(index - 1)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      setActiveInput(index - 1)
    } else if (e.key === "ArrowRight" && index < numInputs - 1) {
      e.preventDefault()
      setActiveInput(index + 1)
    }
  }

  const handleFocus = (index: number) => {
    setActiveInput(index)
  }

  useEffect(() => {
    inputRefs.current[activeInput]?.focus()
  }, [activeInput])

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (pastedData.length >= numInputs) {
      const otpValue = pastedData.substring(0, numInputs).split("")
      onChange(otpValue.join(""))
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {Array(numInputs)
        .fill("")
        .map((_, index) => {
          const otpValue = getOtpValue()
          const inputValue = otpValue[index] || ""

          // Extract all props except key
          const inputProps = {
            type: "text",
            inputMode: "numeric" as const,
            pattern: "[0-9]*",
            maxLength: 1,
            value: inputValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index),
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index),
            onFocus: () => handleFocus(index),
            onPaste: handlePaste,
            ref: (el: HTMLInputElement | null) => (inputRefs.current[index] = el),
            autoComplete: "off",
          }

          // Pass key separately and spread the rest of the props
          return React.cloneElement(renderInput(inputProps) as React.ReactElement, { key: index })
        })}
    </div>
  )
}
