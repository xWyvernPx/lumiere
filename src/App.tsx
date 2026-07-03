import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";

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

// 1. Declare the Root Route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppLayout,
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
  getParentRoute: () => appLayoutRoute,
  path: "/activity/$activityId",
  component: ActivityPage,
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

// 3. Assemble the Route Tree
const appLayoutWithChildren = appLayoutRoute.addChildren([
  indexRoute,
  classroomRoute,
  teacherRoute,
  activityRoute,
  communityRoute,
  archivesRoute,
  libraryRoute,
]);

const routeTree = rootRoute.addChildren([appLayoutWithChildren, authRoute]);

// 4. Create the Router Instance
const router = createRouter({ routeTree });

// 5. Provide Type Safety Support for routing paths and links
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
