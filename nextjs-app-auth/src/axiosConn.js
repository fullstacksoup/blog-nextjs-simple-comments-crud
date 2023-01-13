import axios from 'axios';


var rootURL = process.env.SITE_URL;


const axiosConn = axios.create({
   baseURL: rootURL,
   headers:{
//      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-API-Key' : process.env.NEXT_PUBLIC_API_KEY
   }
});
  
export default axiosConn;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(function (config) {
   console.log('Interceptor Response (outgoing)', config);
   return config;
 }, function (error) {
// Request error
  return Promise.reject(error);
});

// Response interceptor (Incoming) - Optional
axiosConn.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger

   // Response data    
   console.log('Interceptor Response (Incoming)', response);
   return response;
}, function (error) {
   
// Any status codes that falls outside the range of 2xx cause this function to trigger

// Do something with response error
   return Promise.reject(error);
});

