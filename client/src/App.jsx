import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AvailableBooks from './components/availablebooks'
import CheckedoutBooks from './components/checkedoutbooks'
import CheckinBook from './components/checkin'
import CheckoutBook from './components/checkout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AvailableBooks />  
          <CheckedoutBooks />
            <CheckinBook />
              <CheckoutBook />
      </div>
    </>
  )
}

export default App;
