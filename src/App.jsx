import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(false)

  return (
    <Routes>
      {count ? 
        <>
        <Route path='/' element={<Home setCount={setCount} />} />
        </>
        : 
        <>
          <Route path='/*' element={<Login setCount={setCount} />} />
        </>
      }
    </Routes>    
  )
}

export default App
