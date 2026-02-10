import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import AllProducts from './pages/AllProducts.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolver toda la app con CartProvider */}
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='cart' element={<Cart />}/>
            <Route path='allProducts' element={<AllProducts></AllProducts>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
)