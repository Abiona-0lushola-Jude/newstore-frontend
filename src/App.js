import React, { useContext, useEffect } from 'react'
import './Pages/Style.css'
import { Routes, Route} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import ShopAll from './Pages/ShopAll'
import CartPage from './Pages/CartPage'
import LoginPage from './Pages/LoginPage'
import OneProductPage from './Pages/OneProductPage'
import CashPayment from './Pages/Components/CashPayment'
import axios from 'axios'
import { userContext } from './Context/userContext'
import AdminPage from './Pages/AdminPage'
import FullPayment from './Pages/FullPayment'
import GetCart from './Hooks/GetCart'
import SearchPage from './Pages/Components/SearchPage'

axios.defaults.baseURL = "https://newstoreapu.onrender.com/api"
axios.defaults.withCredentials = true

export default function App() {

  const {setUserData, setAdminUser} = useContext(userContext)
  GetCart()
  useEffect(()=>{

    const getUser = async () =>{
      const {data} = await axios.get('/user')
      await setUserData(data)
      
      if(data?.email.includes("Abiona")){
        await setAdminUser(data)
      }
    }
    getUser()
    
  }, [setUserData])


  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/allStore' element={<ShopAll />} />
      <Route path='/admin/:dashboard' element= {<AdminPage />} />
      <Route path='/shop/all-cart' element={<CartPage />} />
      <Route path='/shopStore/:type/:quanity/:total/:id' element={<OneProductPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/user/:register' element={<LoginPage />} />
      <Route path='/shopStore/:Item/buyNow/:id/payment' element={<CashPayment />} />
      <Route path='/login/:admin' element={<LoginPage />} />
      <Route path='/newStore/paid/:id' element={<FullPayment />} />
      <Route path='/store/items/:search' element={<SearchPage />} />
    </Routes>
  )
}
