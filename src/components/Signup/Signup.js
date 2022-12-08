import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rocket from '../../assets/rocket.png';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();


    // handle sign up
    const handleSignUp = data => {
        createUser(data.email, data.password)
        .then(res => {
            console.log(res.user);
            reset();
            navigate('/');
        })
        .catch(err => {
            alert(err.message);
        })
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-login-signup'>
            <div className='card'>
                <div className='text-center mb-2'>
                    <img src={rocket} alt="" className='w-75' />
                    <h3 className='mt-2'>Create Account</h3>
                    <p>Please Sign up for Stock Account.</p>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='mb-4'>
                        <input type="email" {...register("email", { required: "Type a valid e-mail" })} className='form-control' placeholder='Email Address' />
                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    </div>

                    <div className='mb-4'> 
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters long" }
                            })}
                            className='form-control' placeholder='Password' />
                        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                    </div>
                    <input type="submit" value="SIGN UP" className='btn btn-custom' />
                </form>
                <p className='m-0 pt-3'>Already have an account? Please <Link to='/login' className='text-decoration-none'><strong>Login</strong></Link> </p>
            </div>
        </div>
    );
};

export default Signup;