import api from "./api";

const uri = "houseCollect";
export const houseCollectApi = {
  addCollect(model) {
    return api.post(uri + "/addCollect", model)
  },
  getRentPage(model) {
    return api.post(uri + "/toRentCollectList", model)
  },
  getSecondPage(model) {
    return api.post(uri + "/toSellCollectList", model)
  },
  cancelCollect(model) {
    return api.post(uri + "/delCollect", model)
  }
}