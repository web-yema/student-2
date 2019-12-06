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
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true ///当设置 true 的时候该路由不会再侧边栏出现 一般出现在登陆页面 404页面
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true //不在侧边栏线上
  },

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

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "管理员", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "管理员列表", icon: "table" }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "添加管理员", icon: "tree" }
      }
    ]
  },
  {
    path: "/form",
    component: Layout,
    meta: { title: "学生操作", icon: "example" },
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "学生操作", icon: "form" }
      },
      {
        path: "add",
        name: "Add",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "学生添加", icon: "form" }
      }
    ]
  },
  {
    path: "/classList",
    component: Layout,
    meta: { title: "班级信息", icon: "example" },
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "班级列表", icon: "form" }
      },
      {
        path: "add",
        name: "Add",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "添加班级", icon: "form" }
      }
    ]
  },
  {
    path: "/classTeacher",
    component: Layout,
    meta: { title: "班主任", icon: "example" },
    children: [
      {
        path: "classTeacherList",
        name: "ClassTeacherList",
        component: () => import("@/views/form/Handle/index.vue"),
        meta: { title: "班主任列表", icon: "form" }
      },
      {
        path: "addClassTeacherList",
        name: "AddClassTeacherList",
        component: () => import("@/views/form/add-student/index.vue"),
        meta: { title: "添加班主任", icon: "form" }
      }
    ]
  },
  {
    path: "/teacher",
    component: Layout,
    meta: { title: "讲师", icon: "example" },
    children: [
      {
        path: "teacherList",
        name: "TeacherList",
        component: () => import("@/views/teacher/teacherlist/index.vue"),
        meta: { title: "讲师列表", icon: "form" }
      },
      {
        path: "addTeacherList",
        name: "AddTeacherList",
        component: () => import("@/views/teacher/addteacher/index.vue"),
        meta: { title: "添加讲师", icon: "form" }
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
        meta: { title: "市场部", icon: "dashboard" }
      }
    ]
  },

  // {
  //   path: "/form",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       name: "Form",
  //       // component: () => import("@/views/form/Handle/index.vue"),  //不需要  因为只有点击俩子组件才会有页面
  //       meta: { title: "学生操作", icon: "form" }
  //     }
  //   ]
  // },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "menu2" }
      }
    ]
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" }
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
