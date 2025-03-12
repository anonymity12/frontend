import axios from 'axios'
import store from '@/store'
import router from '../router'


const _baseURL= 'http://tt.gww.pics:8081' //"http://localhost:8091/api"
// note: all /apis request will redirect to target: 'http://101.43.166.211:8081',
// and replace /apis to empty
// so /apis/api/login => http://101.43.166.211:8081/api/login
//创建axios实例
const service = axios.create({
  baseURL: _baseURL, // api的base_url
})

// request 请求拦截
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['token'] = window.localStorage.getItem("token")
    }
    return config
  },
  error => {
    // do something with request error
    console.log("request interceptor complain: " ,error) // for debug
    return Promise.reject(error)
  }
)

//response响应拦截
service.interceptors.response.use(
  response => {
    // console.log("utils.request.js say:", response)
    return response 
  },
  error => {
    console.log("tt>>> error:",error)
    if (error.response.status === 401) {
      router.push("/login")
    }
    return Promise.reject(error)
  }
)

export default service
