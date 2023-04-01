import React from 'react'
import useProduct from '../../Hooks/useProduct'
import { RotatingLines } from 'react-loader-spinner'

export default function AllStore({handleClick}) {

        const {productApi} = useProduct()

  return (
    <div>
            {!productApi? <div className='empty-cart cash-container'>
                    <RotatingLines strokeColor="grey" />
            </div>: 
            <div className="store">
                {productApi?.map((el, id)=>{
                    return(
                        <div className="shop-cart" key={id}>
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
            })}
        </div> }       
    </div>
  )
}
