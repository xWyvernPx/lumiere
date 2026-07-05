import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Layout and Pages imports
import AppLayout from "./components/layout/AppLayout";
import PracticingPage from "./pages/practicing";
import ClassroomPage from "./pages/classroom";
import TeacherClassroom from "./pages/classroom/teacher";
import CommunityPage from "./pages/community";
import ArchivesPage from "./pages/archives";
import ActivityPage from "./pages/activity";
import LibraryPage from "./pages/library";

import AuthPage from "./pages/auth";
import LandingPage from "./pages/landing";

import { GlobalTranslation } from "./components/shared/GlobalTranslation";

import AdminLayout from "./components/layout/AdminLayout";
import AdminUserManagement from "./pages/admin/index";

import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

// 1. Declare the Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <GlobalTranslation />
      <Toaster position="top-right" richColors />
    </>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: "/app",
  component: () => (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

// 2. Define Child Routes
const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: PracticingPage,
});

const classroomRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/classroom",
  component: ClassroomPage,
});

const teacherRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/classroom/teacher",
  component: TeacherClassroom,
});

const activityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activity/$activityId",
  component: () => (
    <ProtectedRoute>
      <ActivityPage />
    </ProtectedRoute>
  ),
});

const libraryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/library",
  component: LibraryPage,
});

const communityRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/community",
  component: CommunityPage,
});

const archivesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/archives",
  component: ArchivesPage,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: "/admin",
  component: () => (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminUserManagement,
});

// 3. Assemble the Route Tree
const appLayoutWithChildren = appLayoutRoute.addChildren([
  indexRoute,
  classroomRoute,
  teacherRoute,
  communityRoute,
  archivesRoute,
  libraryRoute,
]);

const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute
]);

const routeTree = rootRoute.addChildren([landingRoute, appLayoutWithChildren, adminLayoutWithChildren, authRoute, activityRoute]);

// 4. Create the Router Instance
const router = createRouter({ routeTree });

// 5. Provide Type Safety Support for routing paths and links
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
