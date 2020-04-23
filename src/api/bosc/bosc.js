import request from '@/router/axios';
export const send = (json) => request({
    url: "/boscTest",
    method: 'post',
    dataType: 'json',
    meta: {
        isToken: false
    },
    data: json,
    headers: {
        'content-type': 'application/json' //自定义请求头信息
    }
})

export const getShow = (id,platsysid) => request({
    url: "/boscTest/getShow",
    method: 'post',
    dataType: 'json',
    meta: {
        isToken: false
    },
    data: {
      code: id,
      platsysid: platsysid
    },
    headers: {
        'content-type': 'application/json' //自定义请求头信息
    }
})

export const T24 = (json) => request({
    url: "/boscTest/T24",
    method: 'post',
    dataType: 'json',
    meta: {
        isToken: false
    },
    data: json,
    headers: {
        'content-type': 'application/json' //自定义请求头信息
    }
})