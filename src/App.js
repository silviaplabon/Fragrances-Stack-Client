import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext, useContext, useState } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import OrdersCollection from './components/OrdersCollection/OrdersCollection';
import AddProducts from './components/AddProducts/AddProducts';
import Order from './components/Order/Order';
import ManageProducts from './components/ManageProducts/ManageProducts';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/Admin/Admin';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <PrivateRoute  exact path="/admin">
            <Admin></Admin>
          </PrivateRoute >
          <PrivateRoute  exact path="/orders">
            <OrdersCollection></OrdersCollection>
          </PrivateRoute >
          <PrivateRoute exact path="/order/:id">
            <Order></Order>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact  path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
