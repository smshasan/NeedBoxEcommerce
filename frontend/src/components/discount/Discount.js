import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategory } from '../../actions/categoryActions'
import { getDiscountBySlug, clearErrors } from '../../actions/discountActions';
import { DISCOUNT_PRODUCT_BY_CATEGORY_RESET, } from '../../constants/discountConstants';
import Sidebar from '../admin/Sidebar';

const Discount = ({match}) => {

    console.log('discountpage', match);
    const [discount, setDiscount] = useState(0);

    const dispatch = useDispatch();
     const {categories} = useSelector((state) => state.category)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.discount);


    useEffect(() => {


        dispatch(getAllCategory(match.params.slug));
         
        
        if (updateError) {
            alert(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            
           
            alert('Product updated successfully');
            dispatch({ type: DISCOUNT_PRODUCT_BY_CATEGORY_RESET });
      
        }
    }, [dispatch, isUpdated, clearErrors]);

    const submitHandler = (e) => {
    //  const { match } = props;
        e.preventDefault();

        const formData = new FormData();
        
        formData.set('discount', discount);
        dispatch(getDiscountBySlug(match.params.slug, formData))
        
       
    }


    return (
        <div>
            <div className="row">
                <div className="col-lg-3">
                    <Sidebar />
                </div>
                    <div className="col-lg-3">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <div className="form-group">
                                                <label htmlFor="discount_field">Set Discount</label>
                                                <input
                                                        type="text"
                                                        id="discount_field"
                                                        className="form-control"
                                                        value={discount}
                                                        onChange={(e) => setDiscount(e.target.value)}
                                                    />
                                        <button
                                                id="login_button"
                                                type="submit"
                                                className="btn btn-block py-3"
                                                disabled={loading ? true : false}
                                            >
                                                UPDATE
                                        </button>
                            
                            </div>
                        </form>
                </div>
            </div>
            
        </div>
    )
}

export default Discount
