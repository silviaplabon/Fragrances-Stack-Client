import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './AddProducts.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';

const AddProducts = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);
  console.log(watch("example")); // watch input value by passing the name of it
  const onSubmit = data => {
    const productData = {
      name: data.name,
      imageURL: imageURL,
      price: data.price,
      weight: data.weight
    };
    const url = `http://localhost:4200/addProduct`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(res => console.log('server side response', res))
  };

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', 'b9c8c292069e10110cf7af6edcbd15eb');
    imageData.append('image', event.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="container row m-auto ">
      <div className="col-md-4 navbarAddProduct pb-5 bg-warning">
        <div className="col-md-12   addProductStyle">
          <div className="m-auto  py-2 linkProduct">
           <Link to="/addProducts" className=""><FontAwesomeIcon className="iconSize me-2" icon={faBars} />Add products</Link>
          </div>
        </div>
        <div className="col-md-12  m-auto  py-3 linkProduct">
          <Link to="/manageProducts" className="" ><FontAwesomeIcon className="iconSize me-2" icon={faPlus} /> Manage Products</Link>
        </div>
        <div className="col-md-12 m-auto py-2 linkProduct">
          <Link to="/admin" className=""><FontAwesomeIcon className="iconSize me-2" icon={faEdit} /> Edit Product</Link>
        </div>
      </div>

      <div className="col-md-8 formSection p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 formStyle">
          <div className="row d-flex">
            <div className="col-md-5">
              <label for="productName">Product Name</label>
              <input name="name" id="productName" className="form-control " defaultValue="" ref={register} />
              <label for="productPrice" className="mt-2">Add Price</label>
              <input name="price" id="productPrice" className="form-control " defaultValue="" ref={register} />
            </div>
            <div className="col-md-5 ms-2">
              <label for="productWeight">Weight</label>
              <input name="weight" id="productWeight" className="form-control " defaultValue="" ref={register} />
              <label for="productImg" className="mt-2">Add Photo</label>
              <input name="image" type="file" id="productImg" className="form-control " onChange={handleImageUpload} ref={register({ required: true })} />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <input type="submit" className="mt-3 btn btn-primary" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

