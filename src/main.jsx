import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart.jsx'
import { AuthProvider } from './context/auth.jsx'
import { CartProvider } from './context/cart.jsx'
import { CheckoutProvider } from './context/checkout.jsx'
import AllProducts from './pages/AllProducts.jsx'
import CheckoutInfo from './pages/Checkout/CheckoutInfo.jsx'
import { CheckoutBilling } from './pages/checkout/CheckoutBilling.jsx'
import { CheckoutComplete } from './pages/checkout/CheckoutComplete.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    {/* Envolver toda la app con CartProvider y checkout provider */}
    <CartProvider>
      <CheckoutProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path='cart' element={<Cart />}/>
              <Route path='allProducts' element={<AllProducts></AllProducts>}></Route>
              <Route path='checkout' element={<CheckoutInfo></CheckoutInfo>}></Route>
              <Route path='checkout/billing' element={<CheckoutBilling></CheckoutBilling>}></Route>
              <Route path='checkout/complete' element={<CheckoutComplete></CheckoutComplete>}></Route>
            </Route>
          </Routes>
      </CheckoutProvider>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)