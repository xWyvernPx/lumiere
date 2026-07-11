with open("src/components/ProtectedRoute.tsx", "r") as f:
    c = f.read()

c = c.replace("""const ProtectedRoute = ({
  allowedRoles,
  children,
}: PropsWithChildren<Props>) => {
  const isAuthenticated = useStore(authStore, selectIsAuthenticated);""", """const MOCKING_LOGIN = import.meta.env.VITE_MOCKING_LOGIN === "true";

const ProtectedRoute = ({
  allowedRoles,
  children,
}: PropsWithChildren<Props>) => {
  const isAuthenticated = useStore(authStore, selectIsAuthenticated);""")

c = c.replace("""  useEffect(() => {
    const verifyAuth = async () => {
      const currentPath = window.location.pathname;""", """  useEffect(() => {
    const verifyAuth = async () => {
      const currentPath = window.location.pathname;
      
      if (MOCKING_LOGIN) {
        if (!user) {
          authActions.setUser({
            id: "mock-user-123",
            email: "mockuser@example.com",
            firstName: "Mock",
            lastName: "User",
            role: { name: "ADMIN" }
          });
        }
        setIsChecking(false);
        return;
      }
""")

with open("src/components/ProtectedRoute.tsx", "w") as f:
    f.write(c)
