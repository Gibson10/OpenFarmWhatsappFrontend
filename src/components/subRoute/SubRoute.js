import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import Vendors from '../pages/Vendors';
import Customers from '../pages/orders/ViewCustomer';
import ViewVendor from '../pages/orders/ViewVendor';
import Transactions from '../pages/Transactions';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoutes';
import NotFound from '../error/NotFound';


	
// This class allows the basic layouts to access these routes
class SubRoute extends Component {	
	render() {
	const {match} = this.props;
		return (
			<div> 
				<Switch>
				<ProtectedRoute exact path={`/`} component = {Dashboard}/>		
				<ProtectedRoute exact path={`/profile`} component={Profile}/>
                <ProtectedRoute exact path={`/orders`} component={Orders}/>
				<ProtectedRoute exact path={`/vendors`} component={Vendors}/>
				<ProtectedRoute exact path={`/viewcustomer`} component={Customers}/>
				<ProtectedRoute exact path={`/viewvendor`} component={ViewVendor}/>
                <ProtectedRoute exact path={`/products`} component={Products}/>
				<ProtectedRoute exact path={`/transactions`} component={Transactions}/>
		
				<Route component={NotFound} />
				</Switch>
			</div>
		);
   }
} 

export default SubRoute;
