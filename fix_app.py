with open("src/App.tsx", "r") as f:
    c = f.read()

# Add import
c = c.replace("""import LibraryPage from "./pages/library";""", """import LibraryPage from "./pages/library";
import AccountPage from "./pages/account";""")

# Add route
c = c.replace("""const libraryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/library",
  component: LibraryPage,
});""", """const libraryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/library",
  component: LibraryPage,
});

const accountRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/account",
  component: AccountPage,
});""")

# Assemble routes
c = c.replace("""  libraryRoute,
]);""", """  libraryRoute,
  accountRoute,
]);""")

with open("src/App.tsx", "w") as f:
    f.write(c)

