import React, { Fragment, useEffect, useState  } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions/productActions';
import Product from '../../product/Product'

const ProductListPage = (props) => {

    
    const product= useSelector(state => state.productsss);
    //  console.log('sec', useSelector(state => state.productsBySlug))

    const dispatch = useDispatch();
      console.log('ppp', product);
    
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
        //  console.log('ppp', products);

        

    }, [])

    return (

        <Fragment>
          
                {/* <h2 style={{ textAlign: 'center', padding: '10px' }}>Products by Category</h2> */}
                
         <div className="container">
                    {


                        
                      
                        
                       <div className = "row">

                        
                                <div className="col-12  col-md-12">
                                    <div className = "row">
                                        {product.products.map((product) => (

                                            <Product key = {product._id} product = {product} col = {3} />
                                            
                                        ))}
                          
                                    </div>
                                    
                                </div>
                        </div>
                    }
                </div>
                                  
         
        </Fragment>
        
    )
}

export default ProductListPage
