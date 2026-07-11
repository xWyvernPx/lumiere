with open("src/components/layout/AdminLayout.tsx", "r") as f:
    c = f.read()

c = c.replace("""  const navItems = [
    { to: "/admin", label: "User Management", icon: Users },
  ];
  
  const secondaryItems = [
    { label: "Operations", icon: Settings },
    { label: "Content", icon: BookOpen },
    { label: "AI Systems", icon: Cpu },
  ]""", """  const navItems = [
    { to: "/admin", label: "User Management", icon: Users },
    { to: "/admin/languages", label: "Languages", icon: BookOpen },
  ];
  
  const secondaryItems = [
    { label: "Operations", icon: Settings },
    { label: "AI Systems", icon: Cpu },
  ]""")

with open("src/components/layout/AdminLayout.tsx", "w") as f:
    f.write(c)

