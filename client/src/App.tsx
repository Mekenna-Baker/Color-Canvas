import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <canvas id='paintMain' width='500' height='500' style={{border: '1px solid #000000'}}></canvas>
      </div>
    </>
  )
}

export default App