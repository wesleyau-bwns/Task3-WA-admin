import Dashboard from "../pages/dashboard/index";
import UserManagement from "../pages/users/index";

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
    component: UserManagement,
    allowedPermissions: [],
    showInMenuContent: true,
  },
];
