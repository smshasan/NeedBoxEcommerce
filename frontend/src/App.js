import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MenuHeader from "./components/layout/MenuHeader";


import ProductListPage from './components/ProductListPage';



import HomePage from './components/HomePage';

import Home from "./components/Home";
import SearchPage from './components/SearchPage';
import ProductDetails from './product/ProductDetails';

// Cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess'

// Order imports
import ListOrders from './components/Order/ListOrders'
import OrderDetails from './components/Order/OrderDetails'

// Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';



// vendor
import LoginVendor from './components/vendor/LoginVendor'
import VendorRegistration from './components/vendor/VendorRegistration'
import VendorList from './components/vendor/VendorList'
import VendorsDashboard from './components/vendor/VendorsDashboard'




// Admin imports 
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';


import ProtectedRoute from './components/route/ProtectedRoute';
import VendorProtectedRoute from './components/route/VendorProtectedRoute';

import { loadUser } from './actions/userActions';
// import { useSelector } from 'react-redux';
import store from './store';
import axios from 'axios';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Category from './components/category/index.js';



function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  // const { user, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <MenuHeader />
           
        <div className="cotainer container-fluid">
          
            <Route path ="/:slug"  component={ProductListPage} exact />

          
          <Route path="/" component={HomePage} exact />
          

            {/* <Route path="/" component={Home} exact /> */}
          
            <Route path="/search/:keyword" component = {SearchPage}  />
            <Route path="/product/:id" component={ProductDetails} exact />
          
            <Route path="/Cart" component={Cart} exact />

          
            <ProtectedRoute path="/shipping" component={Shipping} />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
            <ProtectedRoute path="/success" component={OrderSuccess} />
          
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          
          <Route path="/loginVendor" component={LoginVendor} />
          <Route path="/vendorRegistration" component={VendorRegistration} />
          
          
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route path="/password/reset/:token" component={NewPassword} exact />
           
            <ProtectedRoute path="/me" component={Profile} exact />
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
            <Route path="/orders/me" component={ListOrders} exact />
            <Route path="/order/:id" component={OrderDetails} exact />
        </div>
        


        


        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        
        <ProtectedRoute path = "/category" isAdmin={true} component={Category}  exact />
        
        
        <ProtectedRoute path="/admin/products" isAdmin={true}  component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />


        {/* Vendors Route */}

        <ProtectedRoute path="/dashboard/vendor" isVendor={true}  component={VendorsDashboard} exact /> 
        <ProtectedRoute path="/vendor/products" isVendor={true} component={ProductsList} exact />
        <ProtectedRoute path="/vendor/product" isVendor={true} component={NewProduct} exact />
        <ProtectedRoute path="/vendor/product/:id" isVendor={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/vendor/vendorsList" isVendor={true} component={VendorList} exact />
        <ProtectedRoute path="/vendor/orders" isVendor={true} component={OrdersList} exact />
        <ProtectedRoute path="/vendor/order/:id" isVendor={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/vendor/reviews" isVendor={true} component={ProductReviews} exact />
        
        
      </div>
    </Router>
  );
}

export default App;
