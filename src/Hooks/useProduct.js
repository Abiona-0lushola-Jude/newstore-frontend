import { useEffect, useState } from "react"

export default function useProduct() {

    const [productApi, setProductApi] = useState(null)

    useEffect(()=>{

        const getProduct = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProductApi(data);
              } catch (error) {
                console.log(error);
              }
            
        }

        getProduct()

    }, [])

    
  return {productApi}
    
}
