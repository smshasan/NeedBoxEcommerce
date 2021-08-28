import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const VendorProtectedRoute = ({ isVendor, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }
                       

                        if (isVendor === true && user.role !== 'vendor') {
                            return <Redirect to="/" />
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default VendorProtectedRoute

