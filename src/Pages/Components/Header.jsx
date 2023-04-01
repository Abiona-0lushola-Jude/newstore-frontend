import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FaShoppingCart, FaUserCircle} from 'react-icons/fa'
import {RiMenu3Line} from 'react-icons/ri'
import { userContext } from '../../Context/userContext'
import GetCart from '../../Hooks/GetCart'
import {RxDashboard} from 'react-icons/rx'
import logo from '../../Images/Screenshot (208).png'
import { searchContext } from '../../Context/searchContext'

export default function Header() {

  const {userData, setUserData} = useContext(userContext)
  const navigate = useNavigate()
  const {allCart} = GetCart()
  const {search, handleChange} = useContext(searchContext)
  const [onMenu, setOnMenu] = useState(false)
  const {dashboard} = useParams()

  const handleLogout =async () =>{
    setUserData(null)
  }

  function handleSearch(){
    search !== '' && navigate(`/store/items/:search`)
  }


  return (
    <div className='head-container'>
      <div className="head-wrapper">
        <Link to='/' className="logo">
            <img src={logo} alt="logo" />
        </Link>
        <div className="menu-wrapper">
            <div className="hamBurger" onClick={()=> setOnMenu(prev=> !prev)}>
              <RiMenu3Line fontSize="2rem" className='menuBtn' fill={onMenu ? 'white':'black'} />
             {onMenu && <div className="table">
                <div className="options">
                  <div>
                    <p><Link to='/'>Home</Link></p>
                    <p><Link to='/allStore'>Store</Link></p>
                    <p className='head-cart'><Link to='/shop/all-cart'>Cart <span className='cart-fig2'>{userData && allCart?.length}</span></Link></p>
                  {!userData ?
                    <p><Link to='/login'>Login</Link></p>:
                    <p onClick={handleLogout}>Logout</p>
                    }
                  </div>
                  <div>
                    {userData && <p className='log2'><FaUserCircle fill='white' fontSize="1.8rem" /> {userData?.username}</p>}
                  </div>
                </div>
              </div>  } 
            </div>
            <div className="menu">
                <div className="search">
                    <input type="search" name="search" id="search" value={search} onChange={handleChange} placeholder='Search...' onClick={handleSearch} />
                </div>
                <Link to={'/shop/all-cart'} className="head-cart">
                    {dashboard ? <RxDashboard fontSize="2.5rem" fill='black'/> : 
                    <>
                      <FaShoppingCart fill='black' fontSize="2rem" />
                      <span className='cart-fig'>{allCart?.length}</span>
                    </>
                    }
                    
                </Link>
                <div className="login">
                  <FaUserCircle fill='black' fontSize="1.8rem" />
                    {userData ? <p className="log">{userData.email}</p> : <p className='log'>Login</p>}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
