with open("src/App.tsx", "r") as f:
    content = f.read()

import_str = 'import { queryClient } from "./lib/queryClient";'
new_import_str = 'import { useState, useEffect } from "react";\nimport { queryClient } from "./lib/queryClient";\nimport { LoadingScreen } from "./components/shared/LoadingScreen";'
content = content.replace(import_str, new_import_str)

app_func = """export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}"""

new_app_func = """export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}"""
content = content.replace(app_func, new_app_func)

with open("src/App.tsx", "w") as f:
    f.write(content)
