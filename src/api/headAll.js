import Axios from "axios";
// 获取所有班主任和分页
export const getHeadAll = page => {
  return Axios.post("http://132.232.89.22:8080/headTeacherPage", {
    page: page
  });
};
// 获取所有讲师和分页
export const getTeacherAll = page => {
  return Axios.post("http://132.232.89.22:8080/lecturerPage", {
    page: page
  });
};
