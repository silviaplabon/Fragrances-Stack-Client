import React, { useEffect, useState } from 'react';
import './Admin.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';
import AddProducts from '../AddProducts/AddProducts';
import ManageProducts from '../ManageProducts/ManageProducts';

const Admin = () => {
    const [state,setState]=useState(true);
    return (
        <div className="container row m-auto ">
            {
                state? <AddProducts></AddProducts>:<ManageProducts ></ManageProducts>
            }
        </div>
    );
};

export default Admin;