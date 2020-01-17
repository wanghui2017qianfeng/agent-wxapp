import api from "./api";

const uri = "houseFollow";
export const houseFollowApi = {
  addFollow(model) {
    return api.post(uri + "/addFollow", model)
  },
  getPage(model) {
    return api.post(uri + "/findPage", model)
  },
}