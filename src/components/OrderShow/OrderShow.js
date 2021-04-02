import React from 'react';
import './OrderShow.css';
const OrderShow = (props) => {
    const { name, price, weight, imageURL } = props.order.product;
    const { OrderTime } = props.order;
    return (
            <div className="col  shadow  mt-3 divStyleOrder">
                <div className="card  cardStyle">
                    <div className="row  d-flex justify-content-center align-items-center">
                        <div className="col-md-5 col-sm-5 colStyle p-2">
                            <img src={imageURL} alt="..." className="w-100 h-100 " />
                        </div>
                        <div className="col-md-7 col-sm-7 colStyle">
                            <div className="card-body cardBodyStyle">
                                <h5 className="h5Style ">{name}</h5>
                                <p className="pStyle">{price}</p>
                                <p className="pStyle"><small className="text-muted">{OrderTime}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default OrderShow;