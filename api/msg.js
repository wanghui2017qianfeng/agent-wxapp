import api from "./api";

const uri = "msg";
export const msgApi = {
  getBobao() {
    return api.post(uri + "/bobao")
  },
  getFour(userId) {
    return api.post(uri + "/fourMsg", {
      userId: userId
    })
  },
  getMyInfo(userId) {
    return api.post(uri + "/information", {
      userId: userId
    })

  },
  getInfoList(model) {
    return api.post(uri + "/moreMsg", model)

  }
}