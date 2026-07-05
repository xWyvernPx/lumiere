with open("src/services/auth-service.ts", "r") as f:
    c = f.read()
c = c.replace("return res;", "return res.data?.id || res.data?.email ? res.data : res;")
with open("src/services/auth-service.ts", "w") as f:
    f.write(c)
