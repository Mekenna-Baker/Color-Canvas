import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <canvas id='paintMain' width='100' height='100'></canvas>
      </div>
    </>
  )
}

export default App
