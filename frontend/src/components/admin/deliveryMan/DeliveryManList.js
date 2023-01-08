import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../Sidebar'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allDeliveryMen,  clearErrors } from '../../../actions/deliveryManActions'


const DeliveryManList = ({ history }) => {
    
    const dispatch = useDispatch();


    const { loading, deliveryMen, error } = useSelector(state => state.allDeliveryMen
    )
    
    useEffect(() => {

        dispatch(allDeliveryMen());

        if (error)
        {
            alert(error);
            dispatch(clearErrors());
        }

        

    }, [dispatch, error])


    const setDeliveryMen = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Phone',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        deliveryMen.forEach(deliveryMan => {
            data.rows.push({
                id: deliveryMan._id,
                name: deliveryMan.name,
                phone: deliveryMan.phone,
                role: deliveryMan.role,
                actions: <Fragment>
                    <Link to={`/admin/user/${deliveryMen._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" >
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>

            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Delivery Men'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Delivery Men</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setDeliveryMen()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default DeliveryManList
