import React from 'react';
import { useHistory } from 'react-router';
import './Product.css';
const Product = (props) => {
    const { _id, imageURL, name, price, weight } = props.product;
    const history=useHistory();
    const handleProduct=(id)=>{
        history.push(`/order/${id}`)
    }
    return (
        <div className="col">
            <div className="card h-100">
                <img src={imageURL} className="card-img-top h-75" alt="..." />
                <div class="card-body text-center h-25">
                    <h6 className="card-title">{name} {weight ? '-' : ''}{weight}</h6>
                </div>
                <div className="card-footer  d-flex justify-content-between align-items-center ">
                        <h4 className="h4HomeColor fw-bold ">${price}</h4>
                        <button className="btn buttonColor" onClick={() => handleProduct(_id)}> Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;