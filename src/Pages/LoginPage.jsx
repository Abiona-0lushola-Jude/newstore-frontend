import React, { useContext, useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import img from '../Images/shopping-cart-1923313_960_720.png'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { userContext } from '../Context/userContext'

export default function LoginPage() {

    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState(null)
    const {admin, register}  = useParams()
    const {setAdminUser, setUserData, userData} = useContext(userContext)

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange = async (e) =>{
        const {name, value} = e.target
        await  setUser(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })

    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        const {data} = register ?  await axios.post('/register', user) :  admin ? await axios.post('/admin', user): await axios.post('/login', user)
        if(data.message){
           await  setError(true)
           await  setErrMessage(data.message)
           await  setUserData(null)
        }else{
           await  setError(false)
           await   setErrMessage(null)
           await   admin? await setAdminUser(data) : await setUserData(data)
           register ? navigate('/') : admin ? navigate('/admin/:dashboard'): navigate('/')
        }

    }

    

    

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-wrapper">
            <div className="login-img">
                <img src={img} alt="" />
            </div>
            <div className="login-user">
                <form>
                    {register &&  
                    <>
                    <label htmlFor="username" className="label">Username: </label>
                    <input type="text" name="username" id="username" value={user.username} onChange={handleChange}/>
                    </>
                    }
                    <label htmlFor="email" className="label">Email: </label>
                    <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
                    <label htmlFor="password" className="label">Password: </label>
                    <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
                    <button type="submit" className='lag-btn' onClick={handleSubmit}>{register ? "Register": "Login"}</button>
                    
                </form>
                {error && <p className='error'>{errMessage}</p>}
                {!register && <p className="reg">You don't hava an account? <Link to='/user/:register'>Register</Link></p>}
                {register && <p className="reg">You have already have an account? <Link to='/login'>Login</Link></p>}
                {!admin && <p className="reg">Log in as <Link to='/login/admin'>Admin</Link></p>}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
