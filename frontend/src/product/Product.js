import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

const product = ({ product, col }) => {

    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                        <div className="card p-3 rounded">
                            <img  className="card-img-top mx-auto"  src={product.images[0].url} alt="hello first" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <Link to={`/product/${product._id}`}>{product.name} </Link>
                                </h5>
                                <div className="ratings mt-auto">
                                    <div className="rating-outer">
                                            <div className="rating-inner" style={{width: `${
                                        (product.ratings / 5) * 100}%`}}></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                </div>
                    
                    {product.discount > 0 ?
                        <Fragment>
                            <strong>Special Price</strong>
                            <p className="card-text">৳{product.price - product.discount} <del style={{fontSize: '1rem', color:'#878787'}}>৳{product.price}</del> <small style={{color:'#26a541', fontSize: '1rem'}}>{product.discount}% off</small></p>
                            {/* <del><p className="card-text">৳{product.price}</p></del> */}
                           
                        </Fragment>
                        :
                        <p className="card-text">৳{product.price}</p>
                        
                    }
                                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details </Link>
                            </div>
                        </div>
                    </div>
    )
}

export default product
