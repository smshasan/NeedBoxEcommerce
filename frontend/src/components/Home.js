import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
// import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import ImageSlider from './layout/ImageSlider'


import MetaData from './layout/MetaData'
import Product from '../product/Product'


import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../actions/productActions'



const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    

   
    const dispatch = useDispatch();

    const { products, error, productsCount, resPerPage } = useSelector(state => state.products)
    
    

    useEffect(() => {
       
        dispatch(getProducts( currentPage ));


    
    }, [dispatch,  error, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    

    return (
        
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                 

                    <div className = "container">
                        <ImageSlider/>
                    </div>

                    <section id="products" className="container mt-5">
                    
                        <h1 id="products_heading">Latest Products</h1>
                        <div className = "row">

                        
                                <div className="col-6  col-md-12">
                                    <div className = "row">
                                        {products?.map((product) => (

                                            <Product key = {product?._id} product = {product} col = {3} />

                                        ))}
                                    </div>
                                    
                                </div>
                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
    )
}

export default Home



