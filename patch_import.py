with open("src/pages/auth/index.tsx", "r") as f:
    c = f.read()

c = c.replace("import { RegisterForm } from \"./RegisterForm\";", "import { RegisterForm } from \"./RegisterForm\";\nimport { SocialLoginButtons } from \"./SocialLoginButtons\";")

with open("src/pages/auth/index.tsx", "w") as f:
    f.write(c)

