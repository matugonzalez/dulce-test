import React from 'react'
import './Logo.css'

const Logo = ({className}) => {
  return (
    <h1 className={`Logo ${className ?? ''}`}>DolceMika</h1>
  )
}

export default Logo