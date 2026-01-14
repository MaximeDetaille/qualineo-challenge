/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'antd/dist/reset.css'
import { ThemeProvider } from './context/ThemeContext'
import { ConfigProvider } from 'antd'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ hashed: false }}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
