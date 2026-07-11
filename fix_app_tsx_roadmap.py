with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import ArchivesPage from "./pages/archives";""", """import ArchivesPage from "./pages/archives";
import RoadmapPage from "./pages/roadmap";""")

c = c.replace("""const archivesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/archives",
  component: ArchivesPage,
});""", """const archivesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/archives",
  component: ArchivesPage,
});

const roadmapRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/roadmap",
  component: RoadmapPage,
});""")

c = c.replace("""  indexRoute,
  classroomRoute,""", """  indexRoute,
  roadmapRoute,
  classroomRoute,""")

with open("src/App.tsx", "w") as f:
    f.write(c)

