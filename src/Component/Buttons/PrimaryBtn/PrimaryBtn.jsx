import React from 'react'

export default function PrimaryBtn({classes, handler, children}) {
  return (
    <button onClick={handler} className={`btn text-primary text-gray-100 ${classes}`}>
      {children}
    </button>
  )
}
