import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import './OrdersCollection.css';
import OrderShow from '../OrderShow/OrderShow';
const OrdersCollection = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {
        fetch('https://pumpkin-tart-15792.herokuapp.com/orders?email=' + loggedInUser.email,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setSpinner(false)
            })
    }, [])
    console.log(orders);
    let total = 0;
    {
        orders.map(order => {
            total = total + parseInt(order.product.price);
            console.log(total)
        })
    }


    return (
        <div className="container mt-5">

            {
                orders[0] ? <div className="userDetails  m-auto text-center bgColorOrders mt-5 p-2">
                    <img src={orders[0].photo} className="pt-2" />
                    <h4>Order Confirmation</h4>
                    <h6><span className="fw-bold ">{orders[0].displayName}</span>,thank you for your order!</h6>
                    <p>We will contact you through<span className="fw-bold mb-2 "> {orders[0].email} </span>as soon as you confirmed shipping.</p>
                    <p>You purchase<span className="fw-bold"> {orders.length} </span>product and your total  is <span className="fw-bold"> {total} </span></p>
                </div>
                    :
                    <div className="userDetails  m-auto text-center bgColorOrders mt-5 p-2">
                        <h4>Please Wait</h4>
                        {
                            spinner &&
                            <div className="text-center">
                                <div class="spinner-grow text-warning mt-5" role="status" style={{ width: '2rem', height: '2rem' }}>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <h6>Sorry,This may take some time  for showing orders or you don't have any product </h6>
                            </div>
                        }
                    </div>
            }
            <div className="row row-cols-1 row-cols-md-2   row-cols-sm-1 m-auto g-4">
                {
                    orders.map(order => <OrderShow order={order}></OrderShow>)
                }
            </div>
        </div>
    );
};

export default OrdersCollection;