// 获取班级
export const getClass = () => {
  return Axios.get("http://132.232.89.22:8080/getClass");
};
// 获取学生
export const allstudent = () => {
  // eslint-disable-next-line no-undef
  return Axios.get("http://132.232.89.22:8080/allstudent");
};
