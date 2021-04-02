import React from 'react';
// import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light  navbarDesign container pt-5">
          <div className="container-fluid">
            <h1 className="navbar-brand h2HeaderColor fw-bold" href="#">Fragrances Stack</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/orders" className=" nav-link">Orders</Link>
                <Link to="/admin" className="nav-link">Admin</Link>
                <Link to="/" className="nav-link">Deals</Link>
                {loggedInUser.email && (loggedInUser.displayName ? <button className="btn buttonColor me-2  buttonStyleHeader">{loggedInUser.displayName}</button>
                  : <button className="btn  me-2  buttonStyle buttonColor">{loggedInUser.email}</button>)}
  
                {loggedInUser.email ? <button onClick={() => setLoggedInUser({})} className="btn buttonColor logStyle  buttonStyleHeader ms-1">Logout</button> :
                  <Link to="/login" className="btn  ms-1 buttonStyleHeader buttonColor">Login</Link>
                }
  
              </div>
            </div>
          </div>
        </nav>
      </div>

        
               
               
    );
};

export default Header;