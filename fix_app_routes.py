with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import PrivacyPage from "./pages/account/privacy";""", """import PrivacyPage from "./pages/account/privacy";
import NotificationsPage from "./pages/account/notifications";""")

c = c.replace("""const accountPrivacyRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/privacy",
  component: PrivacyPage,
});""", """const accountPrivacyRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/privacy",
  component: PrivacyPage,
});

const accountNotificationsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/notifications",
  component: NotificationsPage,
});""")

c = c.replace("""  accountPrivacyRoute,
]);""", """  accountPrivacyRoute,
  accountNotificationsRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

