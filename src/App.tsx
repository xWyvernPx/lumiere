import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Eager: the landing page is the initial route (first paint), plus the small
// always-mounted app shell. Everything else is code-split below.
import LandingPage from "./pages/landing";
import { GlobalTranslation } from "./components/shared/GlobalTranslation";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import { RouteFallback } from "./components/shared/RouteFallback";

// Lazy: each route chunk loads on demand. Auth is split too so the Google /
// Facebook / Apple OAuth SDKs stay out of the initial bundle.
const AuthPage = lazy(() => import("./pages/auth"));
const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));

const PracticingPage = lazy(() => import("./pages/practicing"));
const ClassroomPage = lazy(() => import("./pages/classroom"));
const TeacherClassroom = lazy(() => import("./pages/classroom/teacher"));
const CommunityPage = lazy(() => import("./pages/community"));
const ArchivesPage = lazy(() => import("./pages/archives"));
const RoadmapPage = lazy(() => import("./pages/roadmap"));
const ActivityPage = lazy(() => import("./pages/activity"));
const LibraryPage = lazy(() => import("./pages/library"));
const AccountPage = lazy(() => import("./pages/account"));
const HardwarePage = lazy(() => import("./pages/account/hardware"));
const PrivacyPage = lazy(() => import("./pages/account/privacy"));
const NotificationsPage = lazy(() => import("./pages/account/notifications"));

const AdminUserManagement = lazy(() => import("./pages/admin/index"));
const AdminLanguagesPage = lazy(() => import("./pages/admin/languages"));
const AdminActivitiesPage = lazy(() => import("./pages/admin/activities/index"));
const AdminActivitiesEditPage = lazy(() => import("./pages/admin/activities/edit"));
const AdminOperationsPage = lazy(() => import("./pages/admin/operations"));
const AdminAiSystemsPage = lazy(() => import("./pages/admin/ai-systems"));

// 1. Declare the Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Suspense fallback={<RouteFallback fullScreen />}>
        <Outlet />
      </Suspense>
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

const accountRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account",
  component: AccountPage,
});

const accountHardwareRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/hardware",
  component: HardwarePage,
});

const accountPrivacyRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/privacy",
  component: PrivacyPage,
});

const accountNotificationsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/notifications",
  component: NotificationsPage,
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

const roadmapRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/roadmap",
  component: RoadmapPage,
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

const adminLanguagesRoute = createRoute({
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
});

// 3. Assemble the Route Tree
const appLayoutWithChildren = appLayoutRoute.addChildren([
  indexRoute,
  roadmapRoute,
  classroomRoute,
  teacherRoute,
  communityRoute,
  archivesRoute,
  libraryRoute,
  accountRoute,
  accountHardwareRoute,
  accountPrivacyRoute,
  accountNotificationsRoute,
]);

const adminLayoutWithChildren = adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminLanguagesRoute,
  adminActivitiesRoute,
  adminActivitiesEditRoute,
  adminOperationsRoute,
  adminAiSystemsRoute,
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
