import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AvailableBooks from './components/availablebooks'
import CheckedoutBooks from './components/checkedoutbooks'
import CheckinBook from './components/checkin'
import CheckoutBook from './components/checkout'

function App() {
  const [refresh, setRefresh] = useState(false);

const handleRefresh = () => {
    console.log("Triggering refresh in AvailableBooks");
    setRefresh(prev => !prev);
};

  return (
    <>
      <div>
      <AvailableBooks refresh={refresh} />
      <CheckedoutBooks refresh={refresh} />

        <CheckinBook onRefresh={handleRefresh} />
        <CheckoutBook onRefresh={handleRefresh} />
      </div>
    </>
  )
}

export default App;
