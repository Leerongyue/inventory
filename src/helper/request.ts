import axios from 'axios';

type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head'
  | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put'
  | 'PUT' | 'patch' | 'PATCH' | 'link' | 'LINK' | 'unlink' | 'UNLINK'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://192.168.0.234:9033';

export function request(url: string, method: Method, data: {}) {
  return new Promise((resolve, reject) => {
    axios({url, data, method}).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

