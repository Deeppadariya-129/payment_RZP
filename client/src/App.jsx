import React from 'react'
import Product from './components/Product'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PaymentDone from './components/PaymentDone'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/paymentSuccess' element={<PaymentDone />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App