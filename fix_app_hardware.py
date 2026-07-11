with open("src/App.tsx", "r") as f:
    c = f.read()

c = c.replace("""import AccountPage from "./pages/account";""", """import AccountPage from "./pages/account";
import HardwarePage from "./pages/account/hardware";""")

c = c.replace("""  component: AccountPage,
});""", """  component: AccountPage,
});

const accountHardwareRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account/hardware",
  component: HardwarePage,
});""")

c = c.replace("""  accountRoute,
]);""", """  accountRoute,
  accountHardwareRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

