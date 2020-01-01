import api from "./api";

const uri = "customerInfo";
export const kehuApi = {
  getBuyDetail(cusId) {
    return api.post(uri + "/buyDetail",{cusId:cusId})
  },
  getPage(model){
    return api.post(uri + "/findPage", model)
  },
  getContacts(cusId){
    return api.post(uri + "/getContacts", { cusId: cusId })
  },
  getRentDetail(cusId){
    return api.post(uri + "/rentDetail", { cusId: cusId })
  }
}