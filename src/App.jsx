import { useState } from 'react'
import { Leyout } from './Layout/Layout'
import { AppRoutes } from './Routes/AppRutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Leyout />
      <AppRoutes />
    </>
  )
}

export default App
