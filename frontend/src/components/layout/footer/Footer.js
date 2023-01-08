import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Footer = () => {
    return (
        <Fragment>
            <footer className="py-1">
                <p className="text-center mt-1">
                    Needboxbd Cart - 2021-2022, All Rights Reserved
                </p>
                <p className="text-center mt-1">
                    Needboxbd Cart - 2021-2022, All Rights Reserved
                </p>
                <p className="text-center mt-1">
                    Needboxbd Cart - 2021-2022, All Rights Reserved
                </p>
                <h2>
                    <Link to ="/Login/deliveryMan"> Delivery Man</Link>
                </h2>
            </footer>
        </Fragment>
    )
}

export default Footer
