import Dashboard from "../pages/dashboard/index";

// Users
import UserListPage from "../pages/users/UserListPage";
import UserShowPage from "../pages/users/UserShowPage";
import UserCreatePage from "../pages/users/UserCreatePage";
import UserEditPage from "../pages/users/UserEditPage";

export const ALL_PAGES = [
  {
    path: "dashboard", // renders at /dashboard
    label: "Dashboard",
    component: Dashboard,
    allowedPermissions: [],
    showInMenuContent: true,
  },
  {
    path: "users", // renders at /users
    label: "User Management",
    component: UserListPage,
    allowedPermissions: [],
    showInMenuContent: true,
  },
  {
    path: "/users/:id/",
    label: null,
    component: UserShowPage,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "users/create",
    label: null,
    component: UserCreatePage,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "/users/:id/edit",
    label: null,
    component: UserEditPage,
    allowedPermissions: [],
    showInMenuContent: false,
  },
];
