import React from 'react'

type ButtonProps = {
  onClick: (e:any) => void
  label: string
  styles?: string
}

const Button: React.FC<ButtonProps> = ({ onClick , label, styles }) => {
  return (
    <button onClick={onClick} className={styles}>
      {label}
    </button>
  )
}

export default Button
