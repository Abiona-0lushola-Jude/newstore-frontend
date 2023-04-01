import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../../Context/userContext'
import GetCart from '../../Hooks/GetCart'
import Footer from './Footer'
import Header from './Header'

export default function CashPayment() {

    const navigate = useNavigate()
    const {userData} = useContext(userContext)
    const {allCart} = GetCart()
    const {id} = useParams()
    const [payment, setPayment] = useState({
        name:userData?.username,
        address:"",
    })
    

    console.log(allCart)

    function handleChange(e){
        const {name, value} = e.target
        setPayment(prev=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const paymentData = allCart?.filter((el)=> el._id == id)

    
    async function handleSubmit(ev){
        ev.preventDefault()

        const CashPayment = {
          user: userData._id,
          image: paymentData[0]?.image,
          quantity: paymentData[0]?.quantity,
          name: payment.name,
          address:payment.address,
          title: paymentData[0]?.title,
          price:5 + Number(paymentData[0]?.newPrice),
          paid: false
        }


        const {data} = await axios.post('/makeOrder', CashPayment)
        await data && navigate('/newStore/paid/'+data._id)   
    }


  return (
    <>
    <Header />
   {allCart ? <div className='cash-container'>
      <div className="cash-wrapper">
        <h1>CASH ON DELIVERY</h1>
        <p className="title">{paymentData[0]?.title}</p>
        <form className="form">
            <label htmlFor="" className="label">Name on Order: </label>
            <input type="text" name="name" id="name" required value={payment.name} onChange={handleChange}/>
            <label htmlFor="" className="label">Address: </label>
            <textarea name="address" id="address" value={payment.address} onChange={handleChange}></textarea>
            <label htmlFor="" className="label">Total Price: </label>
            <input type="text" name='price' id='price' value={5 + Number(paymentData[0]?.newPrice)}  readOnly/>
            <button type="submit" className='lag-btn' onClick={handleSubmit}>Pay</button>
            <button className='log-btn'><Link to={-1}>Back</Link></button>
        </form>
      </div>
    </div>:
      <div className="cash-container">
        <h1>Loading ......</h1>
      </div>
    }
    <Footer />
    </>
    
  )
}
