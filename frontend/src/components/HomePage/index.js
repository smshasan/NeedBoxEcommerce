
import  React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions/categoryActions';
import Product from '../../product/Product';

const HomePage = () => {

    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch();
    
    // const childrenFilter = categories.filter((category) => category.children.length > 0)
    

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

//  const childrenFilter = () => {
//             return categories.filter((category) => category.children.length > 0)
//     }
//     console.log('children', childrenFilter())

    return (
        <Fragment>
            <div>
                <ul>
                        {
                   
                       categories.map((category, key) =>
                             <li key = { category.name }>  { category.name}</li>
                    )
                    
                    
                        
                  
                
                }
                 </ul>
             
            </div>
        </Fragment>
    )
}

export default HomePage
