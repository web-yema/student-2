import Axios from "axios";
// 获取所有班主任和分页
export const getHeadAll = page => {
  return Axios.post("http://132.232.89.22:8080/headTeacherPage", {
    page: page
  });
};
// 获取所有讲师
export const getLecturer = page => {
  return Axios.get("http://132.232.89.22:8080/getLecturer", {
    page: page
  });
};
//添加讲师
export const addLecturer = data => {
  return Axios.post("http://132.232.89.22:8080/addLecturer", data);
};
//删除讲师
export const delLecturer = id => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/delLecturer", { _id: id });
};
// 修改讲师
export const updateLecturer = obj => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/updateLecturer", obj);
};
// 获取专业
export const getMajor = () => {
  return Axios.get("http://132.232.89.22:8080/getMajor");
};
// 添加专业
export const addMajor = major => {
  return Axios.post("http://132.232.89.22:8080/addMajor", { majorname: major });
};
//获取市场部
export const getMarket = () => {
  return Axios.get("http://132.232.89.22:8080/getMarket");
};
//添加市场部
export const addMarket = market => {
  return Axios.post("http://132.232.89.22:8080/addMarket", {
    marketname: market
  });
};
//删除市场部
export const delMarket = id => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/delMarket", { _id: id });
};
