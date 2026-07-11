with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import AdminUserManagement from "./pages/admin/index";""", """import AdminUserManagement from "./pages/admin/index";
import AdminLanguagesPage from "./pages/admin/languages";""")

c = c.replace("""const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminUserManagement,
});""", """const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminUserManagement,
});

const adminLanguagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/languages",
  component: AdminLanguagesPage,
});""")

c = c.replace("""const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute
]);""", """const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminLanguagesRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

