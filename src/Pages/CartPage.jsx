import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'
import {MdOutlineCancel} from 'react-icons/md'
import GetCart from '../Hooks/GetCart'
import axios from 'axios'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { userContext } from '../Context/userContext'
import { Bars } from 'react-loader-spinner'

export default function CartPage() {

    const {userData} = useContext(userContext)
    const {allCart} = GetCart()
    const [checkout, setCheckout] = useState(false)
    const [newCheckout, setNewCheckout] = useState([])
    const navigate = useNavigate()

    const deleteCart= async (id)=>{
        await axios.delete('/deleteItem/'+id)
        window.location.reload()
    }

    function newCheckOut(price, title, id, quantity, image){
        setNewCheckout({price, title,id, quantity, image})
    }


        // console.log(newCheckout)


    const amount = 5 + Number(newCheckout?.price)
    const currency = "USD";
    const style = {"layout":"vertical"};

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (<>
        { (showSpinner && isPending) && <div className="spinner" /> }
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then(async (details)=> {
                    // Your code here after capture the order
                    const payPalPayment = {
                        user: userData._id,
                        image:newCheckout.image,
                        quantity: newCheckout.quantity,
                        name: details.purchase_units[0].shipping.name.full_name,
                        address:details.purchase_units[0].shipping.address.address_line_1,
                        title: newCheckout.title,
                        price:details.purchase_units[0].amount.value,
                        paid: true
                      }

                      const {data} = await axios.post('/makeOrder', payPalPayment)
                      await data && navigate('/newStore/paid/'+data._id)  
                });
            }}
        />
    </>
    );
    }
    
        
  return (
    <div>
      <Header />
        {!allCart? <div className="empty-cart cash-container">
            <Bars color='black' />
        </div>  
        : 
        <div className="cartPage">
            {allCart?.length > 0 ? <div className='all-cart'>
                        <div className='cart-border'>
                            <p className='cart-head'>My Cart</p>

                                <div className="cart-cover">
                                    {allCart.map((el, id)=>{
                                        return(
                                            <div className="main-cart" key={id} onClick={()=> newCheckOut(el.newPrice, el.title, el._id, el.quantity, el.image)}>
                                                <div className='cart-page'>
                                                    <div className="img-cart">
                                                        <img src={el.image} alt="" />
                                                    </div>
                                                    <div className="desc-cart">
                                                        <p className="title-cart">{el.title}</p>
                                                        <p className="price">$ {el.oldPrice}</p>
                                                        <p className="cat">{el.category}</p>
                                                    </div>
                                                </div>
                                                <div className='submain-cart'>
                                                    <div className="amount">
                                                        <input type="number" name="newCartQuantity" id="" value={el.quantity} readOnly />
                                                    </div>
                                                    <div>
                                                        <p className="total">${el.newPrice}</p>
                                                    </div>
                                                </div>  
                                                <div className="closeModel2" onClick={()=> deleteCart(el._id)}>
                                                    <MdOutlineCancel fontSize="2rem" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                             
                        </div>
                {/* summary Page */}
                <div className='sum'>
                    <p className='cart-head'>Order Summary</p>
                    <div className="summary">
                        <div className="summary-border">
                            <p>Subtotal: <span>$ {newCheckout.price ? newCheckout.price : 0.00}</span></p>
                            <p className="delivery">Shipping fee: <span>$ 5.00</span></p>
                        </div>
                        <h3 className='total'>Total: ${newCheckout.price ? (5 + Number(newCheckout?.price)): 5.00}</h3>
                        {!checkout && <button className='lag-btn' onClick={()=> setCheckout(true)}>Checkout</button>}
                       {checkout && <div className="checkout">
                            <button><Link to={`/shopStore/${newCheckout?.title}/buyNow/${newCheckout?.id}/payment`}>CASH ON DELIVERY</Link></button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "AQgFwFGUqUN7HnaqIq5qMVivDwYRS-01Ir2XFdcFdcY6Hre_PVSWHDfPnQACZYIF15PXxTTucz-7XBCP",
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding":"card"
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                            </PayPalScriptProvider>
                        </div>}
                    </div>
                </div>
            </div>:
            <div className='empty-cart cash-container'>
                <h1>Cart is empty</h1>
                <Link to='/allStore'>Countinue browsing</Link>
            </div>
            }

        </div>}
      <Footer />
    </div>
  )
}
