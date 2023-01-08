import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/categoryActions'
// import ImageSlider from '../layout/ImageSlider'

import Slider from '../layout/Slider';

import Product from '../../product/Product'
import { Link } from 'react-router-dom'
import { Card, Button, CardGroup } from 'react-bootstrap'

const HomePage = () => {
  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()



  useEffect(() => {
   
    dispatch(getAllCategory());

  }, [])

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        children: category.children,
        image: category.images[0].url,
        slug: category.slug,

        
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options
  }

 
  return (
    <Fragment>
      <div>
        <div className="container">
          <div style={{height: '280'}}>
                <Slider />
                </div>
              </div>
              <Fragment>
                 <div className="container">
                    <div className="row">
                      {createCategoryList(category.categories)
          .filter((x) => x.children.length === 0)
          .map((option) => (
              <div className={`col-sm-12 col-md-6 col-lg-3 my-3`}>
                        <div className="card p-3 rounded" style={{textAlign:'center'}}>
                           <Link to={`/${option.slug}`}>
                  <Card.Img variant="top" src={option.image} />
                </Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <Link to={`/${option.slug}`} >{option.name} </Link>
                                </h5>
                                
                                
                                {/* <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details </Link> */}
                            </div>
                        </div>
                    </div>
              ))}
              
                 
                </div>
              </div>
            </Fragment>
          
        
      </div>
    </Fragment>
  )
}

export default HomePage
