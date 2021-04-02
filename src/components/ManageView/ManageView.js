import React from 'react';
import ManageProducts from '../ManageProducts/ManageProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
const ManageView = (props) => {
    const { name, price, weight, _id } = props.product;
    const handleDelete = (id) => {
        fetch(`https://pumpkin-tart-15792.herokuapp.com/deleteProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    //   event.target.parentNode.style.display="none"
                    console.log(res);
                }
            })

    }
    return (
        <>
            <ul className="list-group ulStyle ">
                <li className="list-group-item  liStyle">
                <span className=" listStyle nameStyle">{name}</span>
                <span className=" listStyle  ">{weight}</span>
                <span className="listStyle  text-center">{price}</span>
                <span className="listStyle  "><FontAwesomeIcon className="iconSize text-danger " icon={faTrashAlt} onClick={() => handleDelete(_id)}/></span>
                </li>
            </ul>
            {/* <div className="col-md-5 col-sm-5">
                <h6>{name}</h6>
                col-md-7 col-sm-7 col-xs-7
            </div>
            <div className="col-md-3 col-sm-3">
                <h6>{weight}</h6>
            </div>
            <div className="col-md-2 col-sm-2">
                <h6>{price}</h6>
            </div>
            <div className="col-md-2 col-sm-2">
                <FontAwesomeIcon className="iconSize me-2" icon={faTrashAlt} onClick={() => handleDelete(_id)} />
            </div> */}
        </>
    );
};

export default ManageView;