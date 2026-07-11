with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import AdminLanguagesPage from "./pages/admin/languages";""", """import AdminLanguagesPage from "./pages/admin/languages";
import AdminActivitiesPage from "./pages/admin/activities/index";
import AdminActivitiesEditPage from "./pages/admin/activities/edit";""")

c = c.replace("""const adminLanguagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/languages",
  component: AdminLanguagesPage,
});""", """const adminLanguagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/languages",
  component: AdminLanguagesPage,
});

const adminActivitiesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/activities",
  component: AdminActivitiesPage,
});

const adminActivitiesEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/activities/edit",
  component: AdminActivitiesEditPage,
});""")

c = c.replace("""const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminLanguagesRoute,
]);""", """const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminLanguagesRoute,
  adminActivitiesRoute,
  adminActivitiesEditRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

