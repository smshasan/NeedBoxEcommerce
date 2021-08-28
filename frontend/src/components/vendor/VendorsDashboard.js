import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'
//import Loader from '../layout/Loader'

import Sidebar from '../admin/Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'

const VendorsDashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, /*loading */ } = useSelector(state => state.allOrders)
     const { user, loading } = useSelector(state => state.auth)

    

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])


    //filter product for vendor
    const filterProduct = () => {
            return products.filter((x) => x.user === user._id)
    }
    //filter orders for vendor
    const orderFilter = () => {
            return orders.filter((x) => x.user === user._id)
    }
    
    //determining numbers of outOfStock products
    let outOfStock = 0;
    filterProduct().forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // const filterOrder = () => {
    //     return orders.filter((y) => y.user === user._id)
    // }

    console.log('userRole', user.role)
    console.log('orders', orders)

    return (
        <Fragment>
            <div className="row">
                
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                   
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b> Tk. {totalAmount}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-4 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                        <div className="text-center card-font-size">Products<br /> <b>{filterProduct().length} </b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/vendor/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-4 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                        <div className="text-center card-font-size">Orders<br /> <b>{orderFilter.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/vendor/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                             {user && user.role === 'admin' && (
                                    
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                )}

                            
                            


                                <div className="col-xl-4 col-sm-12 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    

                </div>
            </div>

        </Fragment >
    )
}

export default VendorsDashboard