with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import HardwarePage from "./pages/account/hardware";""", """import HardwarePage from "./pages/account/hardware";
import PrivacyPage from "./pages/account/privacy";""")

c = c.replace("""const accountHardwareRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/hardware",
  component: HardwarePage,
});""", """const accountHardwareRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/hardware",
  component: HardwarePage,
});

const accountPrivacyRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/privacy",
  component: PrivacyPage,
});""")

c = c.replace("""  accountHardwareRoute,
]);""", """  accountHardwareRoute,
  accountPrivacyRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

