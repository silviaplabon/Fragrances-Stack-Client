import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';
import ManageView from '../ManageView/ManageView';
import './ManageProducts.css';
const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://pumpkin-tart-15792.herokuapp.com/productsdata')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className="container row m-auto ">
            <div className="col-md-4 navbarAddProduct pb-5 bg-warning">
                <div className="col-md-12   addProductStyle">
                    <div className="m-auto w-75 py-2">
                        <Link to="/manageProducts" className=""><FontAwesomeIcon className="iconSize me-2" icon={faPlus} /> Manage Products</Link>
                    </div>
                </div>
                <div className="col-md-12 w-75 m-auto  py-3">
                    <Link to="/addProducts" className=""><FontAwesomeIcon className="iconSize me-2" icon={faBars} />Add products</Link>
                </div>
                <div className="col-md-12 w-75 m-auto py-2">
                    <Link to="/admin" className=""><FontAwesomeIcon className="iconSize me-2" icon={faEdit} /> Edit Product</Link>
                </div>
            </div>

            <div className="col-md-8 formSection p-5 m-auto">
                <div className="">
                <ul className=" list-group ulStyle">
                    <li className=" list-group-item liStyle">
                        <span className="listStyle nameStyle">Name</span>
                        <span className="listStyle ms-2">Weight</span>
                        <span className="listStyle ms-2 text-center">Price</span>
                        <span className="listStyle ms-2">Action</span>
                    </li>
                    {
                        products.map(pd => <ManageView product={pd}></ManageView>)
                    }
                </ul>
            </div>
        </div>
        </div>
    );
};

export default ManageProducts;