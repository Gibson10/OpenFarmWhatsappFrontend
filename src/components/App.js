import React, { Component } from 'react';
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
// import LoadingBar from 'react-redux-loading';
import { ProtectedRoute } from './protectedRoute/ProtectedRoutes';
import AppReset from '../layout/Reset'
import AppLogin from '../layout/Login'
import AppRegister from '../layout/Register'
import NotFound from './error/NotFound';

//This class holds  the main route
class App extends Component {	
	render() {
		return (
			<div> 
                <BrowserRouter>
                
                    <Switch>
                        <Route exact path={`/login`} component={AppLogin}/> 
                        <Route exact path={`/AppReset`} component={AppReset}/> 
                        <Route exact path={`/register`} component={AppRegister}/> 
                        <ProtectedRoute path='/' component={BasicLayout} />
                        <Route component={NotFound} />
                    </Switch>
              
                </BrowserRouter>
			</div>
		);
   }
} 

export default App;
