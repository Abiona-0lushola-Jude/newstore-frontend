import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiTwotoneStar } from 'react-icons/ai'
import {MdOutlineCancel} from 'react-icons/md'
import axios from 'axios'
import { userContext } from '../../Context/userContext'

export default function ProductModel({data, close}) {
  
  const {userData} = useContext(userContext)
  const navigate = useNavigate()
  const [postItem, setpostItem] = useState(null)
  const [price, setPrice] = useState(1)
  const [quantity, setQuantity] = useState(0)

  useEffect(()=>{
    setQuantity(price ?Number(data[0].price * price) : data[0].price)
  }, [price])


  
  const makeOrder = async () =>{

    if(!userData){
      return navigate('/login')
    }

    const order = {
      title: data[0].title,
      oldPrice:data[0].price,
      newPrice: quantity,
      quantity:price,
      description: data[0].description,
      category: data[0].category,
      image: data[0].image,
      rating:data[0].rating.rate,
      userId:userData._id
    }
    const res = await axios.post('/postItem', order)
    await setpostItem(res.data)
    await navigate('/shop/all-cart')
  }

  

  return (
    <div className='model-container' key={data[0].image}>
      <div className="model-wrapper">
        <div className="model-img">
            <img src={data[0].image} alt="" />
        </div>
        <div className="model-content">
            <p className="title">{data[0].title}</p>
            <p className="price">$ { quantity}</p>
            <p className="cat">Category: {data[0].category}</p>
            <p className="rating">Rating: {Array(Math.round(data[0].rating.rate)).fill(<AiTwotoneStar key={data[0].price}  fill='gold' fontSize="1.4rem"/>)}</p>
            <div className="form">
                <p className="quantity">Quantity</p>
                <input type="text" name="price" id="quantity" value={price} onChange={(e)=> setPrice(e.target.value)} min={1} />
            </div>
            <button className='lag-btn' onClick={makeOrder}>Add Cart</button>
            <p className='link'><Link to={`/shopStore/${data[0].category}/${price}/${quantity}/${data[0].id}`}>View More Details</Link></p>
        </div>
        <div className='closeModel'>
          <MdOutlineCancel  fontSize="2rem" onClick={close} key={data[0].id} color="black" cursor="pointer"/>
        </div>
      </div>
    </div>
  )
}
