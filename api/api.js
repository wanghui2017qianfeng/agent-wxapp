let app = getApp();
let url = app.globalData.baseUrl
import { wxp } from "../wxp.js"

const request = (uri, options) => {
  return new Promise((resolve, reject) => {
    if (options.msg) {
      wx.showLoading({
        title: options.msg,
        mask: true
      });
    }
    wxp.request({
      url: url + uri,
      method: options.method,
      data: options.data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      if (res.statusCode == 200 && res.data.result == true) {
        resolve(res.data.data)
      } else {
        wx.showToast({
          title: res.data.errorMessage,
          icon: 'none',
          duration: 2000
        });
      }


    }).catch(error => {
      if (options.msg) {
        wx.hideLoading();
      }

      console.log(error)
      wx.showToast({
        title: "😥连接服务器失败",
        icon: 'none',
        duration: 2000
      });
      reject("😥连接服务器失败:" + error.data.errorInfo);
    })
  })
}


const get = (uri, options = {}) => {
  return request(uri, {
    method: 'GET',
    data: options
  })
}

const post = (uri, options) => {
  return request(uri, {
    method: 'POST',
    data: options
  })
}

const put = (uri, options) => {
  return request(uri, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (uri, options) => {
  return request(uri, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}