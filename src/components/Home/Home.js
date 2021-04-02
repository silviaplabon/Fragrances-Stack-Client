import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4200/productsdata')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setSpinner(false)
            })
    }, [])
    console.log(products);

    return (
        <div className="container">
            {
                spinner &&
                <div className="text-center">
                    <div class="spinner-grow text-warning mt-5" role="status" style={{ width: '2rem', height: '2rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1    m-auto g-4 ">

                {
                    products.map(pd => <Product product={pd}></Product>)
                }
            </div>
        </div>
    );
};

export default Home;
