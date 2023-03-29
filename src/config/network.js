// 导入封装好的Axios
import { request } from './request' //注意request.js的相对路径问题
//1. get请求---获取首页的多个数据
export function get (url, data = {}, token) {
  return request({
    url: url,
    method: 'get',
    headers: {
      "token": token,
    },
    // 可以带参数也可以不带参数
    params: data
  })
}
// 2.1 post请求---传输json数据时，获取电视剧多个数据
export function post (url, data = {}, token) {
  return request({
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      "token": token,
      "Access-Control-Max-Age": 3600,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Origin": "*"
    },
    method: 'post',
    data: data
  })
}
//2.2 post请求---传输文件流,表单Form Data 数据时
export function setPost (url, data = {}, token) {
  return request({
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
      "token": token,
      "Access-Control-Max-Age": 3600,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Origin": "*"
    },
    method: 'post',
    data
  })
}


// 2.1 put---传输json数据时，获取电视剧多个数据
export function put (url, data = {}, token) {
  return request({
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      "token": token,
      "Access-Control-Max-Age": 3600,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Origin": "*"
    },
    method: 'put',
    data: data
  })
}

// 删除接口
export function deleteData (url, token) {
  console.log(url);
  return request({
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      "token": token,
      "Access-Control-Max-Age": 3600,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Origin": "*"
    },
    method: 'delete',
    data: null
  })
}