import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react'
import { useTheme } from '../context/ThemeContext'

interface InputProps {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ placeholder, type, value, onChange }) => {
  const { isDarkMode } = useTheme()

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'background-color 0.3s, border-color 0.3s',
  }

  const focusStyle = {
    borderColor: isDarkMode ? '#777' : '#aaa',
    outline: 'none',
  }

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      style={inputStyle}
      onFocus={(e) => {
        Object.assign(e.currentTarget.style, focusStyle)
      }}
      onBlur={(e) => {
        Object.assign(e.currentTarget.style, inputStyle)
      }}
    />
  )
}

export default Input
