import Axios from "axios";

// 获取班级
export const getClass = () => {
  return Axios.get("http://132.232.89.22:8080/getClass");
};
// 获取分页和班级
export const classPage = (page, major) => {
  return Axios.post("http://132.232.89.22:8080/classPage", {
    page: page,
    major: major
  });
};
// 删除班级
export const delClass = id => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/delClass", { _id: id });
};
// 修改班级
export const updateClass = obj => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/updateClass", obj);
};
// 创建班级
export const createClass = data => {
  return Axios.post("http://132.232.89.22:8080/createClass", data);
};
// 获取学生
export const allstudent = () => {
  // eslint-disable-next-line no-undef
  return Axios.get("http://132.232.89.22:8080/allstudent");
};
// 获取分页和学生
export const getPage = page => {
  return Axios.post("http://132.232.89.22:8080/allstudentPage", {
    page: page
  });
};
// 修改学生信息
export const getUpdate = (_id, obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/updateAllstud", {
    id: _id,
    upstud: obj
  });
};
// 获取专业
export const getMajor = () => {
  return Axios.get("http://132.232.89.22:8080/getMajor");
};
// 批量修改学生
export const updateStudent = (id, obj) => {
  // eslint-disable-next-line no-undef
  return Axios.post("http://132.232.89.22:8080/updateStudent", {
    ids: id,
    updateObj: obj
  });
};
