with open("src/pages/auth/SocialLoginButtons.tsx", "r") as f:
    c = f.read()

c = c.replace('className="grid grid-cols-3 gap-4"', 'className="grid grid-cols-1 gap-3"')

with open("src/pages/auth/SocialLoginButtons.tsx", "w") as f:
    f.write(c)

