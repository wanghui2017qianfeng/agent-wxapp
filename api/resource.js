import api from "./api";

const uri = "resource";
export const resourceApi = {
  getList(model) {
    return api.post(uri + "/cus",model)
  },
  getRentHouse(model) {
    return api.post(uri + "/rentHouse", model)
  },
  getSecondHouse(model) {
    return api.post(uri + "/sellHouse", model)
  },
}