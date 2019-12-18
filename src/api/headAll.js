import Axios from "axios";

// 获取所有班主任和分页
export const getHeadAll = (page, pageSize) => {
  return Axios.post("http://132.232.89.22:8080/headTeacherPage", {
    page: page,
    pageSize: pageSize
  });
};
// 修改班主任信息
export const updateHead = (id, name) => {
  return Axios.post("http://132.232.89.22:8080/updateHeadTeacher", {
    _id: id,
    headname: name
  });
};
// 添加一名班主任
export const addHead = person => {
  return Axios.post("http://132.232.89.22:8080/addHeadTeacher", {
    ...person
  });
};
// 删除一名班主任
export const deleteHead = id => {
  return Axios.post("http://132.232.89.22:8080/delHeadTeacher", {
    _id: id
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
