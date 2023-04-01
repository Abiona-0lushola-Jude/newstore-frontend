import { useState } from "react"

export default function ShowModel() {
    const [showMiniCart, setShowMiniCart] = useState(false)

    function showPage(){
        setShowMiniCart(prev=> !prev)
    }

  return {showMiniCart, showPage}
}
