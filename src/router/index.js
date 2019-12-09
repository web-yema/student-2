import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //登录
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true ///当设置 true 的时候该路由不会再侧边栏出现 一般出现在登陆页面 404页面
  },
  //404
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true //不在侧边栏线上
  },
  //首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard", //重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  //学生查询
  {
    path: "/student",
    component: () => import("@/views/student/index"),
    hidden: true
  }
];

//权限
export const asyncRoutes = [
  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    alwaysShow: true, // 将始终显示根菜单
    name: "Example",
    meta: { title: "管理员", icon: "example", roles: ["1"] },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "管理员列表", icon: "table", roles: ["1"] }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "添加管理员", icon: "tree", roles: ["1"] }
      }
    ]
  },
  {
    path: "/form",
    component: Layout,
    meta: { title: "学生操作", icon: "example", roles: ["1", "2", "3"] },
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "学生操作", icon: "form", roles: ["1", "2", "3"] }
      },
      {
        path: "add",
        name: "Add",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "学生添加", icon: "form", roles: ["1", "2"] }
      }
    ]
  },
  {
    path: "/classList",
    component: Layout,
    meta: { title: "班级信息", icon: "example", roles: ["1", "2", "3"] },
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "班级列表", icon: "form", roles: ["1", "2", "3"] }
      },
      {
        path: "add",
        name: "Add",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "添加班级", icon: "form", roles: ["1", "2"] }
      }
    ]
  },
  {
    path: "/classTeacher",
    component: Layout,
    meta: { title: "班主任", icon: "example", roles: ["1", "2", "3"] },
    children: [
      {
        path: "classTeacherList",
        name: "ClassTeacherList",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "班主任列表", icon: "form", roles: ["1", "2", "3"] }
      },
      {
        path: "addClassTeacherList",
        name: "AddClassTeacherList",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "添加班主任", icon: "form", roles: ["1", "2"] }
      }
    ]
  },
  {
    path: "/teacher",
    component: Layout,
    meta: { title: "讲师", icon: "example", roles: ["1", "2", "3"] },
    children: [
      {
        path: "teacherList",
        name: "TeacherList",
        component: () => import("@/views/teacher/teacherlist/index.vue"),
        meta: { title: "讲师列表", icon: "form", roles: ["1", "2", "3"] }
      },
      {
        path: "addTeacherList",
        name: "AddTeacherList",
        component: () => import("@/views/teacher/addteacher/index.vue"),
        meta: { title: "添加讲师", icon: "form", roles: ["1", "2"] }
      }
    ]
  },
  {
    path: "/agora",
    children: [
      {
        path: "agora",
        name: "市场部",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "市场部", icon: "dashboard", roles: ["1", "2", "3"] }
      }
    ]
  },
  {
    path: "/major",
    component: Layout,
    redirect: "/major/menu1",
    children: [
      {
        path: "menu1",
        component: () => import("@/views/major/menu1/index.vue"),
        name: "专业",
        meta: { title: "专业", icon: "dashboard", roles: ["1", "2", "3"] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
