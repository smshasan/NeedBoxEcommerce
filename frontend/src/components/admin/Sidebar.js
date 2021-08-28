import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">

                    {user && user.role === 'admin' &&(
                        <li>
                            <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                        </li>
                    )}
                    {user && user.role === 'vendor' && (
                        <li>
                            <Link to="/dashboard/vendor"><i className="fa fa-tachometer"></i> Dashboard</Link>
                        </li>
                    )}
                    

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">

                            {user && user.role === 'admin' && (
                                <li>
                                    <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                                </li>

                            )}

                            {user && user.role === 'vendor' && (
                                <li>
                                    <Link to="/vendor/products"><i className="fa fa-clipboard"></i> All</Link>
                                </li>

                            )}

                            {user && user.role === 'admin' && (
                                <li>
                                    <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                                </li>
                            )}
                            {user && user.role === 'vendor' && (
                                <li>
                                    <Link to="/vendor/product"><i className="fa fa-plus"></i> Create</Link>
                                </li>
                            )}
                        </ul>
                    </li>

                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </li>
                    )}

                    {user && user.role === 'vendor' && (
                        <li>
                            <Link to="/vendor/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </li>
                    )}

                    

                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                        </li>
                    )}

                    {/* <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li> */}

                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                         </li>
                    )}

                    {user && user.role === 'vendor' && (
                         <li>
                        <Link to="/vendor/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>
                    )}
                    
                     {user && user.role === 'admin' && (
                        <li>
                            <Link to="/vendor/vendorsList"><i className="fa fa-users"></i> Vendors </Link>
                        </li>
                    )}
                    
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar