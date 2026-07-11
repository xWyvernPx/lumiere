with open("src/pages/auth/index.tsx", "r") as f:
    c = f.read()

import re
c = re.sub(
    r'(const navigate = useNavigate\(\);\n\n)',
    r'\1  React.useEffect(() => {\n    if (import.meta.env.VITE_MOCKING_LOGIN === "true") {\n      authActions.setUser({\n        id: "mock-user-123",\n        email: "mockuser@example.com",\n        firstName: "Mock",\n        lastName: "User",\n        role: { name: "ADMIN" },\n      });\n      navigate({ to: "/app" });\n    }\n  }, [navigate]);\n\n',
    c
)

with open("src/pages/auth/index.tsx", "w") as f:
    f.write(c)

