import React from 'react'
import {FaTwitter, FaFacebookF, FaPinterest, FaYoutube} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'


export default function Footer() {
  return (
    <div className='footer'>
      <div className='content'>
        <ul>
            <li>Shop</li>
            <li>Stockists</li>
            <li>Blog</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
         <ul>
            <li>FAQ</li>
            <li>Shopping and Returns</li>
            <li>Store Policy</li>
            <li>Payment Methods</li>
        </ul>
      </div>
      
      <div>
        <div className="mail">
            <p className="mail-text">Enter your mail here *</p>
            <div className="mail-box">
                <input type="email" name="" id="" />
                <button>Subscribe</button>
            </div>
        </div>
        <div className="contact">
            <div> <FaFacebookF /> </div>
            <div> <BsInstagram /> </div>
            <div> <FaPinterest /> </div>
            <div> <FaYoutube /> </div>
            <div> <FaTwitter /> </div>
        </div>
      </div>
    </div>
  )
}
