import React, { useContext } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AdminDash from './Components/AdminDash'
import { Link } from 'react-router-dom'
import { userContext } from '../Context/userContext'


export default function AdminPage() {
  
  const {adminUser} = useContext(userContext)
  

  return (
    <div>
        <Header />
          <div>
               {adminUser ? <AdminDash user={adminUser}/> : 
               <div className='admin-wrap'>
                <h1>Admin cannot be found!</h1>
                <p>Login in as the Admin</p>
                <button className="lag"><Link to='/login/:admin'>Login in as Admin</Link></button>
                </div>}
          </div>
        <Footer />
      
     
    </div>
  )
}
