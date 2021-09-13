import React, { Fragment, useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../../actions/categoryActions';
import Input from '../../UI/Input';


const MenuHeader = () => {

    const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  console.log('categor', category);

    useEffect (() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categories) => {
    let myCategoriess = [];
    for (let category of categories) {
      myCategoriess.push(
        <li key={category.name}>

          {
            category.parentId ? <a href={category.slug}>{category.name}</a> :
              <span>{category.name}</span>
          }

          
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategoriess;
  };

    return (
        <Fragment>
            <div className="menuHeader">
                <ul>
                    {category.categories.length > 0 ? renderCategories(category.categories) : null}
                </ul>
            </div>
        </Fragment>
        
    )
}

export default MenuHeader
