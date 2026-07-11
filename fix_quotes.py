with open("src/pages/auth/SocialLoginButtons.tsx", "r") as f:
    c = f.read()

c = c.replace("style={{ height: 40 }}\"", "style={{ height: 40 }}")

with open("src/pages/auth/SocialLoginButtons.tsx", "w") as f:
    f.write(c)

