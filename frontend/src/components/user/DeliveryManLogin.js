import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/deliveryManActions'

const DeliveryManLogin = ({ history, location }) => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

   // const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.deliveryMan);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

    }, [dispatch,  isAuthenticated, error, history]) 
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(phone, password))
    }

    return (
        <Fragment>
          
               
              
                     
                    <MetaData title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Phone</label>
                                    <input
                                        type="text"
                                        id="phone_field"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/registration/deliveryMan" className="float-right mt-3">New Delivery Man?</Link>
                            </form>
                        </div>
                    </div>
        </Fragment>
    )
}

export default DeliveryManLogin