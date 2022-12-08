import React from 'react';
import './Login.css';
import rocket from '../../assets/rocket.png';
import google from '../../assets/google.png';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center bg-login-signup'>
            <div className='card'>
                <div className='text-center mb-2'>
                    <img src={rocket} alt="" className='w-75'/>
                    <h3 className='mt-2'>Welcome to Stock</h3>
                    <p>Login for see your info.</p>
                </div>
                <form>
                    <input type="email" className='form-control mb-4' placeholder='Email Address' />
                    <input type="password" className='form-control mb-4' placeholder='Password' />
                    <input type="submit" value="LOGIN" className='btn btn-custom' />
                </form>
                <div className='text-center my-2'>
                    <strong>OR</strong>
                </div>
                <button className='btn btn-light border'><img className='w-icon' src={google} alt=''/>&nbsp;&nbsp;&nbsp;&nbsp;Continue With Google</button>
                <p className='m-0 pt-3'>New to stock? Please <Link to='/signup' className='text-decoration-none'><strong>Sign Up</strong></Link> </p>
            </div>
        </div>
    );
};

export default Login;