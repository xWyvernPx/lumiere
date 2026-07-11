with open("src/lib/apiClient.ts", "r") as f:
    c = f.read()

c = c.replace("""const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/email/login") ||
      originalRequest?.url?.includes("/auth/refresh");""", """const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/email/login") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (import.meta.env.VITE_MOCKING_LOGIN === "true") {
       return Promise.reject(error);
    }""")

with open("src/lib/apiClient.ts", "w") as f:
    f.write(c)

