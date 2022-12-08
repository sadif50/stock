import React, { useContext } from 'react';
import './Login.css';
import rocket from '../../assets/rocket.png';
import google from '../../assets/google.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const {logIn, googleLogin} = useContext(AuthContext);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const provider = new GoogleAuthProvider();

    // Log in with user Email and password.
    const handleLogin = data => {
        logIn(data.email, data.password)
        .then(res => {
            console.log(res.user);
        })
        .catch(err => {
            alert(err.message);
        });
        reset();
    }

    // Google Log in
    const logInWithGoogle = () => {
        googleLogin(provider)
        .then(res =>{
            console.log(res.user)
        })
        .catch(err => {
            alert(err.message);
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-login-signup'>
            <div className='card'>
                <div className='text-center mb-2'>
                    <img src={rocket} alt="" className='w-75'/>
                    <h3 className='mt-2'>Welcome to Stock</h3>
                    <p>Login for see your info.</p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input type="email" {...register("email", { required: "Type a valid Email" })} className='form-control mb-4' placeholder='Email Address' />
                    {errors.email && <p className='text-primary'>{errors.email.message}</p>}

                    <input type="password" 
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be 6 characters long" }
                    })}
                    className='form-control mb-4' placeholder='Password' />
                    {errors.password && <p className='text-primary'>{errors.password.message}</p>}
                    <input type="submit" value="LOGIN" className='btn btn-custom' />
                </form>
                <div className='text-center my-2'>
                    <strong>OR</strong>
                </div>
                <button onClick={()=>logInWithGoogle()} className='btn btn-light border'><img className='w-icon' src={google} alt=''/>&nbsp;&nbsp;&nbsp;&nbsp;Continue With Google</button>
                <p className='m-0 pt-3'>New to stock? Please <Link to='/signup' className='text-decoration-none'><strong>Sign Up</strong></Link> </p>
            </div>
        </div>
    );
};

export default Login;