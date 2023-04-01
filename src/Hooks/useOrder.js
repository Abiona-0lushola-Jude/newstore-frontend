import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useOrder() {

    const [allOrder, setAllOrder] = useState(null)
    const [allCustomer, setAllCustomer] = useState(null)

    useEffect(()=>{
        const getOrder = async ()=>{
            const {data} = await axios.get('/getAllOrder')
            setAllOrder(await data)

            const res  = await axios.get('/users')
            setAllCustomer(res.data)
        }
        getOrder()

    }, [])

  return {allOrder, allCustomer}
}
