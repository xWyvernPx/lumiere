with open("src/pages/auth/useAuth.ts", "r") as f:
    c = f.read()

c = c.replace("""export const socialLogin = async (data: { provider: string, token: string }) => {
  const response = await apiClient.post(`/auth/${data.provider}/login`, { token: data.token });""", """export const socialLogin = async (data: { provider: string, idToken?: string, accessToken?: string }) => {
  const payload = data.provider === 'facebook' 
    ? { accessToken: data.accessToken } 
    : { idToken: data.idToken };
  const response = await apiClient.post(`/auth/${data.provider}/login`, payload);""")

with open("src/pages/auth/useAuth.ts", "w") as f:
    f.write(c)

