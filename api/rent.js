import api from "./api";

const uri = "houseRent";
export const secondApi = {

  getDetailInfo(model) {
    return api.post(uri + "/findById", model)

  },
  getPage(model) {
    return api.post(uri + "/findPage", model)

  }
}