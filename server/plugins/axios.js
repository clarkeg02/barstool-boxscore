import https from 'https';
import axios from 'axios';

export default function Axios() {
  const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      withCredentials: true
  });

  instance.interceptors.request.use(function (config) {
    return config
  })

  instance.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    return error
  })

  return instance
}