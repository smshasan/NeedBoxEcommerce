import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/categoryActions'
import ImageSlider from '../layout/ImageSlider'
import Product from '../../product/Product'
import { Link } from 'react-router-dom'
import { Card, Button, CardGroup } from 'react-bootstrap'

const HomePage = () => {
  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  // const childrenFilter = categories.filter((category) => category.children.length > 0)

  useEffect(() => {
    dispatch(getAllCategory())
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

        // type: category.type
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options
  }

  //  const childrenFilter = () => {
  //      return category.categories.filter(x => x.children.length === 0)

  //     }
  // console.log("catchild", category.categories.children)
  // console.log('childrenFilter', childrenFilter())

  //     const renderCategories = (categories) => {
  //     let myCategoriess = [];
  //     for (let category of categories) {
  //       myCategoriess.push(
  //         <li key={category.name}>

  //           {
  //             category.parentId  && category.children.length > 0 && <a href={category.slug}>{category.name}</a>

  //           }

  //           </li>

  //         );

  //         console.log('childrenlength', category.children.length )
  //         }

  //     return myCategoriess;
  //   };

  //   console.log('frontCategory', category)

  return (
    <Fragment>
      <div>
              <div className = "container">
                        <ImageSlider/>
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
              
                  {/* <CardGroup>
                      {createCategoryList(category.categories)
          .filter((x) => x.children.length === 0)
          .map((option) => (
              <Card style={{width:'22rem'}} >
                <Link to={`/${option.slug}`}>
                  <Card.Img variant="top" src={option.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{option.name}</Card.Title>

                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              ))}
              </CardGroup>      */}
                </div>
              </div>
            </Fragment>
          
        {/* {createCategoryList(category.categories)
            .filter((x) => x.children.length === 0)
            .map((option) => (
              <li
                key={option.value}
                value={option.value}
                style={{ display: 'inline-flex' }}
              >
                <Fragment>
                  <Link to={`/${option.slug}`}>
                    {' '}
                    <img src={option.image} />
                  </Link>
                  {option.name}
                </Fragment>
              </li>
            ))} */}
      </div>
    </Fragment>
  )
}

export default HomePage
