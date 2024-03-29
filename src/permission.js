import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // 进度条样式
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress配置

const whiteList = ["/login", "/auth-redirect", "/student"]; // 在白名单重定向中

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 确定用户是否已登录
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // eslint-disable-next-line no-unused-vars
        const isLogin = await store.dispatch("user/getInfo");
        next();
      } else {
        try {
          // 获取用户信息
          // 注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
          const { roles, loginFlag } = await store.dispatch("user/getInfo");

          // 判断 loginFlag为true还是false
          // 如果是true就走 next(`/changepassword`) 修改页面
          // 如果是 false 就直接进去首页给用户分配权限路由
          if (loginFlag) {
            next(`/changepassword`);
          } else {
            // 基于角色生成可访问路由图
            const accessRoutes = await store.dispatch(
              "permission/generateRoutes",
              roles
            );

            // 动态添加可访问路由
            router.addRoutes(accessRoutes);

            // 确保addRoutes完整的hack方法
            // 设置replace:true，这样导航就不会留下历史记录
            next({ ...to, replace: true });
          }
        } catch (error) {
          // 移除令牌并转到登录页以重新登录
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* 没有标记*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next();
    } else {
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
