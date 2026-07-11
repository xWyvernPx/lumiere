with open("src/components/layout/AppLayout.tsx", "r") as f:
    c = f.read()

c = c.replace("""  const navItems = [
    { to: "/app", label: "Practicing", icon: BookOpen },
    { to: "/app/classroom", label: "The Classroom", icon: GraduationCap },
    { to: "/app/community", label: "Community Desk", icon: Users },
    { to: "/app/archives", label: "Saved Archives", icon: Archive },
    { to: "/app/library", label: "Activities Library", icon: Library },
  ];""", """  const navItems = [
    { to: "/app", label: "Practicing", icon: BookOpen },
    { to: "/app/roadmap", label: "The Curriculum Flow", icon: Route },
    { to: "/app/classroom", label: "The Classroom", icon: GraduationCap },
    { to: "/app/community", label: "Community Desk", icon: Users },
    { to: "/app/archives", label: "Saved Archives", icon: Archive },
    { to: "/app/library", label: "Activities Library", icon: Library },
  ];""")

import re
if "import { Route" not in c:
    c = re.sub(r'import\s+\{\s*([^}]+)\s*\}\s*from\s*["\']lucide-react["\'];', lambda m: f'import {{ {m.group(1)}, Route }} from "lucide-react";', c)

with open("src/components/layout/AppLayout.tsx", "w") as f:
    f.write(c)

