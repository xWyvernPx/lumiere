with open("src/pages/auth/useAuth.ts", "r") as f:
    c = f.read()

c += """
export const socialLogin = async (data: { provider: string, token: string }) => {
  const response = await apiClient.post(`/auth/${data.provider}/login`, { token: data.token });
  return response.data?.id || response.data?.email || response.data?.token ? response.data : response;
};

export const useSocialLogin = () => {
  return useMutation({
    mutationFn: socialLogin,
  });
};
"""

with open("src/pages/auth/useAuth.ts", "w") as f:
    f.write(c)

