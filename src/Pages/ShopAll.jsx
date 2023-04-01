import React, { useState } from 'react'
import ShowModel from '../Hooks/ShowModel'
import Footer from './Components/Footer'
import Header from './Components/Header'
import ProductModel from './Components/ProductModel'
import useProduct from '../Hooks/useProduct'
import AllStore from './Components/AllStore'
import { RotatingLines } from 'react-loader-spinner'

export default function ShopAll() {
    const {productApi} = useProduct()
    const {showMiniCart, showPage} =ShowModel()
    const [productId, setProductId] = useState(null)

    function handleClick(id){
        setProductId([id])
        showPage()
    }

    const copiedData = productApi && [...productApi]
    

  return (
    <div className='shop-container'>
      <Header />
      <div>
            <div className="main-shop">
                <div className="new-shop">
                <h1>NEW ARRIVALS</h1>
                {!productApi? <div className='empty-cart cash-container'>
                    <RotatingLines strokeColor="grey" />
                </div>
                : 
                <div className="store">
                   {copiedData?.splice(0,4).map((el,id)=>{
                        return(
                            <div className="shop-cart" key={id}>
                                <div className="new">
                                    <p>New</p>
                                </div>
                                <div className="cart-img">
                                    <img src={el.image} alt="" />
                                </div>
                                <div className="cart-desc">
                                    <p className="cart-name">{el.title}</p>
                                    <p className="cart-price">$ {el.price}</p>
                                </div>
                                <div className='cart-btn'>
                                    <button className='showBtn' onClick={()=> handleClick(el)}>Add Cart</button>
                                </div>
                            </div>
                        )
                    }) } 
                </div>}
                
                </div>
                <div className="all-shop">
                    <h1>ALL STORE</h1>
                    <AllStore handleClick={handleClick}/>
                </div>
            </div>
            {/*  */}
            {showMiniCart && 
                <div className='showModel'>
                    <div className="model">
                        <ProductModel data={productId} close={showPage}/>
                    </div>
                </div> }
      </div>
      

     <Footer />
  </div>
  )
}
