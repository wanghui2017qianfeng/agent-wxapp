import api from "./api";

const uri = "customerFollow";
export const kehuControlApi = {
  getRentPage(model) {
    return api.post(uri + "/chooseRent", model)
  },
  getSecondPage(model) {
    return api.post(uri + "/chooseSell", model)
  },
  geLookDetail(model) {
    return api.post(uri + "/LookDetail", model)
  },
  geLookRecord(model) {
    return api.post(uri + "/LookRecord", model)
  },
  addFollow(model){
    return api.post(uri + "/saveFollowUp", model)

  },
  getFollowList(model){
    return api.post(uri + "/selectFollowList", model)

  },
  getLookList(model) {
    return api.post(uri + "/selectLookList", model)

  },
}