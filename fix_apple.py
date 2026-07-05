with open("src/pages/auth/SocialLoginButtons.tsx", "r") as f:
    c = f.read()

c = c.replace("usePopup: true\n          }}", "usePopup: true\n          }}\n          uiType=\"dark\"")

with open("src/pages/auth/SocialLoginButtons.tsx", "w") as f:
    f.write(c)

