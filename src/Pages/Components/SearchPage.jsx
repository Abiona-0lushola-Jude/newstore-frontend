import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { searchContext } from '../../Context/searchContext'
import useProduct from '../../Hooks/useProduct'
import Footer from './Footer'
import Header from './Header'

export default function SearchPage({handleClick}) {

        const { search} = useContext(searchContext)
        const {productApi} = useProduct()

        const projudctApi = productApi?.filter((el)=> el.title.includes(search))
        
  return (
    <div>
        <Header />
            {search ? <div className="store">
                {search && projudctApi?.map((el, id)=>{
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
            </div> :
            <div className='empty-cart cash-container'>
                <h1>Nothing to search...</h1>
                <Link to='/allStore'>Countinue browsing</Link>
            </div>
            }  
        <Footer />      
    </div>
  )
}
