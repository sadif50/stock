import React from 'react';
import { Link } from 'react-router-dom';
import rocket from '../../assets/rocket.png';

const Signup = () => {
    return (
        <div className='d-flex justify-content-center align-items-center bg-login-signup'>
            <div className='card'>
                <div className='text-center mb-2'>
                    <img src={rocket} alt="" className='w-75'/>
                    <h3 className='mt-2'>Create Account</h3>
                    <p>Please Sign up for Stock Account.</p>
                </div>
                <form>
                    <input type="email" className='form-control mb-4' placeholder='Email Address' />
                    <input type="password" className='form-control mb-4' placeholder='Password' />
                    <input type="submit" value="SIGN UP" className='btn btn-custom' />
                </form>
                <p className='m-0 pt-3'>Already have an account? Please <Link to='/login' className='text-decoration-none'><strong>Login</strong></Link> </p>
            </div>
        </div>
    );
};

export default Signup;