import request from '../utils/Request';
import {resetPassword,getProfile} from '../utils/Request'


//User account
export function login(params) {
  console.log('hawa hapa',params);
  return request('login', { method: 'POST', body: params, });
}

export function register(params) {
  return request('signUp', { method: 'POST', body: params, });
}
export function forgot(params) {
  return request('forgotPasswordOtp', { method: 'POST', body: params, });
}
export function resetpass(params) {
  return resetPassword('resetPassword', { method: 'PUT', body: params, });
}
export function profileGet() {
  return getProfile('getProfile', {method: 'GET'});
}


export function profilePut(params) {
  return request('users/updateProfile', { method: 'PUT', body: params, });
}


export function addProducts(params) {
  return request('addProducts', { method: 'POST', body: params, });
}
export function addVendors(params) {
  return request('addVendors', { method: 'POST', body: params, });
}

export function getProducts() {
  return request('getProducts', { method: 'GET' });
}


export function getVendors() {
  return request('getVendors', { method: 'GET' });
}

export function getTransactions() {
  return request('getTransactions', { method: 'GET'});
}

export function getOrders() {
  return request('getOrders', { method: 'GET' });
}

export function getCustomerByPhone(params) {
  return request('getCustomerByNumber', { method: 'POST',body:params});
}

export function getVendorByPhone(params) {
  return request('getVendorByNumber', { method: 'POST',body:params});
}




