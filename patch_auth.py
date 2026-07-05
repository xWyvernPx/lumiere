with open("src/pages/auth/useAuth.ts", "r") as f:
    c = f.read()

c += """
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await apiClient.post('/auth/forgot/password', data);
  return response.data?.id || response.data?.email ? response.data : response;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
"""

with open("src/pages/auth/useAuth.ts", "w") as f:
    f.write(c)

