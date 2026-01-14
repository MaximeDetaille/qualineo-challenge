import { FC, ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const { isDarkMode } = useTheme()

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: isDarkMode ? '#fff' : '#000',
    backgroundColor: isDarkMode ? '#333' : '#fff',
    border: isDarkMode ? '1px solid #fff' : '1px solid #000',
    transition: 'background-color 0.3s, color 0.3s',
  }

  const hoverStyle = {
    backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
  }

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, buttonStyle)
      }}
    >
      {children}
    </button>
  )
}

export default Button
