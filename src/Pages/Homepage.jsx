import React from 'react'
import { useNavigate } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'
import HomeStore from './Components/HomeStore'
import homepage from '../Images/ecommerce-2140604_960_720.jpg'

export default function Homepage() {
const naviagte  = useNavigate()

  return (
    <div className='home-container'>
      <Header />
      <div className="home">
        <img src={homepage} alt="header" />
        <div className="img-desc">
          <h1>ALWAYS BE REAL,<br /> ORIGINAL!</h1>
          <p>NEW ARRIVALS ARE HERE</p>
          <button onClick={()=> naviagte('/allStore')}>Shop All</button>
        </div>
      </div>
      <HomeStore />
      <div>

      </div>
      <Footer />
    </div>
  )
}
