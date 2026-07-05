import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace(
    'import AuthPage from "./pages/auth";',
    'import AuthPage from "./pages/auth";\nimport LandingPage from "./pages/landing";'
)

# Add landingRoute
content = content.replace(
    'const appLayoutRoute = createRoute({',
    'const landingRoute = createRoute({\n  getParentRoute: () => rootRoute,\n  path: "/",\n  component: LandingPage,\n});\n\nconst appLayoutRoute = createRoute({'
)

# Update appLayoutRoute
content = content.replace(
    '  id: "app",\n  component:',
    '  id: "app",\n  path: "/app",\n  component:'
)

# Update adminIndexRoute
content = content.replace(
    'const adminIndexRoute = createRoute({\n  getParentRoute: () => adminLayoutRoute,\n  path: "/admin",\n  component: AdminUserManagement,\n});',
    'const adminIndexRoute = createRoute({\n  getParentRoute: () => adminLayoutRoute,\n  path: "/",\n  component: AdminUserManagement,\n});'
)

# Update adminLayoutRoute
content = content.replace(
    'const adminLayoutRoute = createRoute({\n  getParentRoute: () => rootRoute,\n  id: "admin",\n  component: () => (\n    <ProtectedRoute allowedRoles={["ADMIN"]}>\n      <AdminLayout />\n    </ProtectedRoute>\n  ),\n});',
    'const adminLayoutRoute = createRoute({\n  getParentRoute: () => rootRoute,\n  id: "admin",\n  path: "/admin",\n  component: () => (\n    <ProtectedRoute allowedRoles={["ADMIN"]}>\n      <AdminLayout />\n    </ProtectedRoute>\n  ),\n});'
)

# Update routeTree
content = content.replace(
    'const routeTree = rootRoute.addChildren([appLayoutWithChildren, adminLayoutWithChildren, authRoute, activityRoute]);',
    'const routeTree = rootRoute.addChildren([landingRoute, appLayoutWithChildren, adminLayoutWithChildren, authRoute, activityRoute]);'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

