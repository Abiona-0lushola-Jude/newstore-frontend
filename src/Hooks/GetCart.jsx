import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { userContext } from '../Context/userContext'

export default function GetCart() {
    const {userData} = useContext(userContext)
    const [allCart, setAllCart] = useState(null)

    useEffect(()=>{
        const getAllCart = async ()=>{
            const {data} = await axios.get('/product/'+userData?._id)
            await setAllCart(data)
        }

        getAllCart()
    }, [])

  return {allCart}
}
