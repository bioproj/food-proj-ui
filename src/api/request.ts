import type { AxiosRequestConfig, Method } from 'axios';

import { message as $message } from 'antd';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import { history } from '@/routes/history';
import {BASE_URL} from '@/config'

const axiosInstance = axios.create({
  timeout: 6000,
});
// const authorization = 
axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('Authorization') }`,
    };

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    // debugger
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    // debugger
    // http状态是200,内部状态是500
    if(config?.data?.code === 500){
      $message.error(config.data.msg)    
      // Promise.reject(config.data.msg);  
      throw new Error(config.data.msg);
      // return {
      //   code:config?.data?.code ,
      //   message: config.data.msg,
      //   result: null,
      // };
    }
    

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }
    // debugger
    // console.log(error.response.status)
    if(error.response.status === 401){
      // const navigate = useNavigate();
      history.push('/login');
      // navigate("/#login")
      // console.log(error.response)
      errorMessage = '登录过期，请重新登录';
    }
    console.dir(error);
    error.message && $message.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  code: number;
  msg: string;
  data: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
const filterList = ['/user/notice','/user/menu']
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  // const prefix = '/api'
  // debugger
  let prefix = ''
  if(!filterList.includes(url) ){
    prefix = `${BASE_URL}` //'http://192.168.10.177:30000';
  }
    

  url = prefix + url;

  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else if (method === 'put') {
    return axiosInstance.put(url, data, config);
  } else if(method === 'delete'){
    return axiosInstance.delete(url, {
      params: data,
      ...config,
    });
  }else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
