import api from "./api";

const uri = "city";

export const cityApi = {
  getCircle(areaId) {
    return api.post(uri + "/getCircle", {
      areaId
    })
  },
  getArea(cityId) {
    return api.post(uri + "/getArea", {
      cityId
    })
  },
  getAllCity() {
    return api.post(uri + "/allCity")
  },
  getProject(str){
    return api.post(uri + "/getProjectName", {
      str:str
    })
  }
}