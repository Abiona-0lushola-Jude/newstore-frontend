import React, { useState } from 'react'
import ShowModel from '../../Hooks/ShowModel'
import ProductModel from './ProductModel'
import useProduct from '../../Hooks/useProduct'
import { Bars } from 'react-loader-spinner'

export default function HomeStore() {

  const {productApi} = useProduct()
  const {showMiniCart, showPage} = ShowModel()
  const [productId, setProductId] = useState(null)

  function handleClick(id){
    setProductId(productApi.filter((el)=> el.id === id))
    showPage()
  }


  return (
    <div className='shopStore'>
            <div className="store-head">
              <h1>SHOP</h1>   
            </div>
      {!productApi? <div className='empty-cart cash-container'>
          <Bars color="black" />
      </div>
      : 
      <div className="store">
            {productApi?.slice(0 ,8).map((el, id)=>{
              return(
                <div className="home-shop" key={id}>
                  <div className="shop-cart">
                      <div className="cart-img">
                          <img src={el.image} alt="" />
                      </div>
                      <div className="cart-desc">
                          <p className="cart-name">{el.title}</p>
                          <p className="cart-price">$ {el.price}</p>
                      </div>
                      <div className='cart-btn'>
                          <button className='showBtn' onClick={()=> handleClick(el.id)}>Add Cart</button>
                      </div>
                  </div>
              </div>
              )
            }) }
      </div>}
      {/*  */}
      {showMiniCart && <div className='showModel'>
        <div className="model">
          <ProductModel data={productId} close={showPage}/>
        </div>
      </div> }
        
    </div>
  )
}
