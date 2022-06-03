import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { eventLogout } from '../../actions/events';
//import { Redirect } from 'react-router-dom';
//import { LoginScreen } from '../auth/LoginScreen';

export const Navbar = () => {

  const { name } = useSelector( state => state.auth )
  const dispatch = useDispatch()
  const handlelogaout = () => {
    dispatch(startLogout());
    dispatch(eventLogout());
      // localStorage.removeItem('token');
    // window.location.reload(true);
  }
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            { name }
        </span>
        <button 
            className='btn btn-outline-danger'
            onClick={handlelogaout}
        >
            <li className='fas fa-sign-out-alt'></li>
            <span> Salir </span>
        </button>
        
    </div>
  )
}
