import api from "./api";

const uri = "dictionary";
export const dicApi = {
  getList(model) {
    return api.post(uri + "/getList", model)
  },
}