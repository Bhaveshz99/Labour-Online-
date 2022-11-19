import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='login_wrapper'>
      <div className="closure">
        
        <Link to='/signup'><label>New User?</label></Link>
      </div>
    </div>
  )
}

export default Login