
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { getAllCategory } from '../../actions/categoryActions'



const Discount = () => {

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
            <h1>Discount</h1>
        </Fragment>
    )
}

export default Discount
