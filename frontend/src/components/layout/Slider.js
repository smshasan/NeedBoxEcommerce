import React, { Fragment, useEffect, useState } from 'react'

import { getSlider, clearErrors } from '../../actions/sliderActions'
import { useDispatch, useSelector } from 'react-redux'

import { Carousel } from 'react-bootstrap';

const Slider = () => {


    const [index, setIndex] = useState(0);

    const dispatch = useDispatch();
    const { loading, slider, succeess, error } = useSelector(state => state.getSlider);

    console.log('getSlider', slider);

    useEffect(() => {

        dispatch(getSlider());
        
         if (error) {
            alert(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error]);
  
  // const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
        <Carousel style={{height: '280px' }} activeIndex={index} onSelect={handleSelect}  >
          {
            slider.map((slide) => (
              <Carousel.Item  interval={2000}>
            <img
              className="d-block w-100 h-100"
              src={slide.images[0].url}
              alt={slide.name}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          ))
        }
        </Carousel>  
      </Fragment>
      );
}

export default Slider
