import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import {newSlider, clearErrors} from '../../actions/sliderActions'

const Slider = () => {

    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch();

    const { loading, slider, success, error} = useSelector(state => state.newSlider);

    useEffect(() => {

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        if (success) {
            // if (user.role === 'admin') history.push('/admin/products');
            // if (user.role==='vendor') history.push('/vendor/products');
            alert('slider created successfully');
            // dispatch({ type: NEW_PRODUCT_RESET })
        }


        
    }, [dispatch, error, success]);


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
       
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newSlider(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }





    return (
        <Fragment>
            <MetaData title={'New Slider'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Slider</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>


                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='slider_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                     </label>
                                    </div>
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="100" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default Slider
