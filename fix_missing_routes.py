with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import AdminActivitiesEditPage from "./pages/admin/activities/edit";""", """import AdminActivitiesEditPage from "./pages/admin/activities/edit";
import AdminOperationsPage from "./pages/admin/operations";
import AdminAiSystemsPage from "./pages/admin/ai-systems";""")

c = c.replace("""const adminActivitiesEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/activities/edit",
  component: AdminActivitiesEditPage,
});""", """const adminActivitiesEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/activities/edit",
  component: AdminActivitiesEditPage,
});

const adminOperationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/operations",
  component: AdminOperationsPage,
});

const adminAiSystemsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/ai-systems",
  component: AdminAiSystemsPage,
});""")

c = c.replace("""  adminActivitiesRoute,
  adminActivitiesEditRoute,
]);""", """  adminActivitiesRoute,
  adminActivitiesEditRoute,
  adminOperationsRoute,
  adminAiSystemsRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

