
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { getAllCategory } from '../../actions/categoryActions'
import {Link} from 'react-router-dom'
import Sidebar from '../admin/Sidebar';




const SubCategoryForDiscount = () => {

 
  
   const dispatch = useDispatch()

  const category = useSelector((state) => state.category)
  
   
    useEffect(() => {
      dispatch(getAllCategory());  
        
    }, [dispatch])
  
  

   const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        children: category.children,
        image: category.images[0].url,
        slug: category.slug,

        // type: category.type
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options
  }

    return (
      <Fragment>
        
        <div className="row">
          <div className="col-lg-3"><Sidebar /></div>
          <div className="col-lg-3"></div>

          <div className="col-lg-3 shadow-lg" style={{float:'right', textAlign: 'center'}}>
        <h4 style={{paddingTop: '10px', paddingBottom: '10px'}}> Select subcategory for Discount</h4>
        
       
            <Fragment>
              
                   {createCategoryList(category.categories)
          .filter((x) => x.children.length === 0)
            .map((option) => (
            
              <ul>
                <Link to = {`/admin/discountOfCategory/${option.slug}`}><li>{option.name}</li></Link>
              </ul>
           
            
          ))}
          
          </Fragment>
           </div>
          </div>
            </Fragment>
             
         
       
    )
}

export default SubCategoryForDiscount
