import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import payment from '../Hooks/payment.json'
import {FaRegAddressCard } from 'react-icons/fa'
import {FcMoneyTransfer} from 'react-icons/fc'
import {MdOutlinePayments } from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'
import {RiNumbersLine} from 'react-icons/ri'
import { useParams } from 'react-router'
import axios from 'axios'

export default function FullPayment() {

    const {id} = useParams()
    const  [ orderData, setOrderData] = useState(null)

    useEffect(()=>{
        const getOrder = async () =>{
            const {data} = await axios.get('/getOrder/'+id)
            await setOrderData(data)
        }

        getOrder()
    },[])

    // console.log(orderData)

  return (
    <div>
      <Header />
        <div className="fullPayment">
            <h1>Payment Successful.</h1>
                <div className="paymentDone">
                    <div className="payment-wrapper">
                        <div className="payment">
                            <MdOutlinePayments fontSize="2rem"/>
                            <p>{orderData?._id}</p>
                        </div>
                        <div className="payment">
                            <FaRegAddressCard fontSize="2rem"/>
                            <p>{orderData?.name}</p>
                        </div>
                        <div className="payment">
                            <GrMapLocation fontSize="2rem"/>
                            <p>{orderData?.address}</p>
                        </div>
                        <div className="payment">
                            <RiNumbersLine fontSize="2rem"/>
                            <p>{orderData?.quantity}</p>
                        </div>
                        <div className="payment">
                            <FcMoneyTransfer fontSize="2rem"/>
                            <p>{orderData?.title}</p>
                        </div>
                    </div>
                    <div className="summary">
                        <h2>Payment Summary</h2>
                                <div className="summary-border">
                                    <p>Subtotal: <span>$ {payment.price}</span></p>
                                    <p className="delivery">Shipping fee: <span>$ 5.00</span></p>
                                </div>
                                <h3 className='total'>Total: $ {5 + Number(payment.price)}</h3>
                                <button className='lag-btn'>{orderData?.paid === true ? "Paid": "Pending...."}</button>
                    </div>
                </div>
            
        </div>
      <Footer />
    </div>
  )
}
