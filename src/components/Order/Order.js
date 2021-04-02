import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Order.css'
const Order = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, weight, price } = product;
    useEffect(() => {
        fetch(`http://localhost:4200/product/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
    }, [])
    const handleCheckout = () => {
        const orderDetails = { ...loggedInUser, product: product, OrderTime: new Date().toDateString('dd/MM/yyyy') };
        console.log(orderDetails)
        fetch('http://localhost:4200/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div className="mt-5 container m-auto w-75 orderSection">
            <div className="tableStyle shadow py-5 px-3">
            <table class="table table-striped table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >{name}</td>
                        <td>1</td>
                        <td>{price}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="table-warning">
                        <th colSpan="2">Total</th>
                        <th>{price}</th>
                    </tr>
                </tfoot>
            </table>
            </div>
            <div ClassName="mt-5" style={{float:'right'}}>
                 <button onClick={() => handleCheckout()} className="btn btn-success mt-5 mb-5">Checkout</button>
            </div>
        
        </div>
    );
};

export default Order;