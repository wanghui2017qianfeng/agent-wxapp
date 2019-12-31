import api from "./api";

const uri = "houseSell";
export const secondApi = {

  getDetailInfo(model) {
    return api.post(uri + "/findById",model)

  },
  getPage(model) {
    return api.post(uri + "/findPage", model)

  }
}