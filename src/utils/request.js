import axios from 'axios'
import store from '@/store'

// http://101.43.166.211:8981/api
const _baseURL= 'http://101.43.166.211:8081' //"http://localhost:8091/api"
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
axios.interceptors.response.use(response => {

    return response 
    /*
    // omit, cause: when request aliyun, it's undefine
    let res = response.data;
    console.log(res)

    if (res.code === 200) {
      console.log("res.code === 200")
      return response
    } else {
      console.log("res.code != 200, it's ", res.code)// when request aliyun, it's undefine
      return Promise.reject(response.data.msg)
    }
    */
  },
  error => {
    console.log(error)
    if (error.response.data) {
      error.message = error.response.data.msg
    }

    if (error.response.status === 401) {
      router.push("/login")
    }
    return Promise.reject(error)
  }
)


export default service
