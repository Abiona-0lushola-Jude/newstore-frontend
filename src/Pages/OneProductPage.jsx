import React, { useContext,  useEffect,  useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'
import useProduct from '../Hooks/useProduct'
import {AiTwotoneStar, AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'
import { userContext } from '../Context/userContext'
import axios from 'axios'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import GetCart from '../Hooks/GetCart'

export default function OneProductPage() {

    const {productApi} = useProduct()
    const {userData} = useContext(userContext)
    // const {allCart} = GetCart()
    const { total,quanity,id } = useParams()
    const  [payNow, setPayNow] = useState(false)
    const [newId, setNewId] = useState(null)
    const navigate = useNavigate()

    

    const postData = productApi?.filter((el)=> el.id == Number(id))

    const postUpdatedItem = async ()=>{
        if(!userData){
          return  navigate('/login')
        }

        const updatedOrder = {
            title: postData[0].title,
            oldPrice:postData[0].price,
            newPrice: total,
            quantity:quanity,
            description: postData[0].description,
            category: postData[0].category,
            image: postData[0].image,
            rating:postData[0].rating.rate,
            userId:userData._id
        }

        const res = await axios.post('/postItem', updatedOrder)
        
       return res.data
    }

    const amount = total
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
                    if(!userData){
                        return navigate('/login')
                    }

                    const payPalPayment = await {
                        user: userData?._id,
                        image: postData[0]?.image,
                        quantity: quanity,
                        name: details.purchase_units[0].shipping.name.full_name,
                        address:details.purchase_units[0].shipping.address.address_line_1,
                        title: postData[0]?.title,
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

    const handleAddBuy =async()=>{
        if(!userData){
          return navigate('/login')
        }
        const id = await postUpdatedItem()
        await setNewId(id)
        if(newId){
            await navigate(`/shopStore/${postData[0]?.title}/buyNow/${newId?._id}/payment`)
        }
    }

    
  return (
    <div>
        <Header />
       {!productApi ? <div className="empty-cart cash-container"><h1>Loading......</h1></div> : 
            
        <div className="product">
            <div className="product-head">
                <div>
                    <p className="product-name">{postData[0].title}</p>
                </div>
                <div className='product-control'>
                    <Link to={-1} className="back"><AiOutlineArrowLeft /> PREV</Link>
                    <Link to={userData ? '/shop/all-cart': '/login'} className="next">NEXT <AiOutlineArrowRight /></Link>
                </div>
            </div>

            <div className="product-wrap">
                <div className="image">
                    <div className="img">
                        <img src={postData[0].image} alt="" />
                    </div>
                    <div className="image-content">
                        <p>{postData[0].description}</p>
                    </div>
                </div>

                <div className="products-content">
                    <p className="product-title">{postData[0].title}</p>
                    <p className="product-price">${total}</p>
                    <p className="product-quantity">Rating: {Array(Math.floor(postData[0].rating.rate)).fill(<AiTwotoneStar key={postData[0].price}  fill='gold' fontSize="1.4rem"/>)}</p>
                    <p className="product-quantity">Quantity: {quanity}</p>
                   
                    {!payNow && <div className="Btn">
                        <button><Link to={userData ? '/shop/all-cart': '/login'} onClick={postUpdatedItem}>Add Cart</Link></button>
                        <button onClick={()=> setPayNow(true)}>Buy Now</button>
                    </div>}
                    {payNow && <div className="Btn">
                            <button onClick={handleAddBuy}>CASH ON DELIVERY</button>
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
        </div>}
      <Footer />
    </div>
  )
}
