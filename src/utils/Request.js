import fetch from 'dva/fetch';

const SET_TOKEN='SET_TOKEN'
function parseJSON(response) {
  console.log("RESPONSE: ", response);
  return response.json();
}


function checkStatus(response) {
  console.log("RESPONSE ya pili: ", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  const newOptions = {  ...options }; 
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    console.log(newOptions.body instanceof FormData);
    if (!(newOptions.body instanceof FormData)) {
     console.log(newOptions);
     localStorage.getItem(SET_TOKEN);
      newOptions.headers = {
        Accept: 'application/json; ',
        'Content-Type': 'application/json; charset=utf-8',  
        // 'x-access-token':localStorage.getItem(SET_TOKEN) ,      
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',  
        // 'x-access-token':localStorage.getItem(SET_TOKEN) ,
        ...newOptions.headers,
      };
      newOptions.body = newOptions.body;
    }
  }
  else{
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',  
      // 'x-access-token':localStorage.getItem(SET_TOKEN) ,
      ...newOptions.headers,
    };
  }
  return fetch(process.env.REACT_APP_SERVER_URL + url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log('request.js', data);

      if (newOptions.method === 'DELETE' || data.status === 204) {
        return data.text();
      }
      return data;
    }
  )
    .catch(err => {
      console.log("ERR", err);
    });
}

// export function ExternalRequests(url,options){
//   const newOptions = {  ...options }; 

//       newOptions.headers = {
//         Accept: 'application/json; ',
//         'Content-Type': 'application/json; charset=utf-8',        
//         ...newOptions.headers,
//       };
//       newOptions.body = JSON.stringify(newOptions.body);

//   return fetch(url, newOptions)
//   .then(checkStatus)
//   .then(parseJSON)
//   .then(data => {
//     console.log('request.js', data.msg);
//   return data;
//   }
// )
//   .catch(err => {
//     console.log("ERR", err);
//   });
// }

export function resetPassword(url,options){
  const newOptions = {  ...options }; 
      newOptions.headers = {
        Accept: 'application/json; ',
        'Content-Type': 'application/json; charset=utf-8',       
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
  return fetch(process.env.REACT_APP_SERVER_URL  + url, newOptions)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => {

  return data;
  }
)
  .catch(err => {
    console.log("ERR", err);
  });
}

export function getProfile(url,options){
  console.log("TOKEN")
  const newOptions = {  ...options }; 
      newOptions.headers = {
        Accept: 'application/json; ',
        // 'Content-Type': 'application/json; charset=utf-8',      
        'authorization':localStorage.getItem(SET_TOKEN), 
        ...newOptions.headers,
      };
  return fetch(process.env.REACT_APP_SERVER_URL  + url, newOptions)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => {

  return data;
  }
)
  .catch(err => {
    console.log("ERR", err);
  });
}