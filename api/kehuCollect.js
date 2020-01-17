import api from "./api";

const uri = "customerCollect";
export const kehuCollectApi = {
  addCollect(model) {
    return api.post(uri + "/addCollect", model)
  },
  getPage(model) {
    return api.post(uri + "/collectList", model)
  },
  cancelCollect(model) {
    return api.post(uri + "/delCollect", model)
  }
}