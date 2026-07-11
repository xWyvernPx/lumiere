with open("src/pages/auth/SocialLoginButtons.tsx", "r") as f:
    c = f.read()

c = c.replace("""import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";""", """import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";""")

c = c.replace("""  const handleSocialSuccess = async (provider: string, token: string) => {
    try {
      const response = await socialLoginMutation.mutateAsync({ provider, token });""", """  const handleSocialSuccess = async (provider: string, data: { idToken?: string, accessToken?: string }) => {
    try {
      const response = await socialLoginMutation.mutateAsync({ provider, ...data });""")

c = c.replace("""  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => handleSocialSuccess('google', tokenResponse.access_token),
    onError: () => showNotice("error", "Google login failed"),
  });""", "")

c = c.replace("""        {/* Google */}
        <Button
          variant="outline"
          type="button"
          onClick={() => loginGoogle()}
          className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer h-auto"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Google</span>
        </Button>""", """        {/* Google */}
        <div className="flex items-center justify-center h-full">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleSocialSuccess('google', { idToken: credentialResponse.credential });
              }
            }}
            onError={() => showNotice("error", "Google login failed")}
            type="standard"
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>""")

c = c.replace("""          callback={(response: any) => {
            if (response.accessToken) {
              handleSocialSuccess('facebook', response.accessToken);""", """          callback={(response: any) => {
            if (response.accessToken) {
              handleSocialSuccess('facebook', { accessToken: response.accessToken });""")

c = c.replace("""          onSuccess={(response: any) => handleSocialSuccess('apple', response.authorization.id_token)}""", """          onSuccess={(response: any) => handleSocialSuccess('apple', { idToken: response.authorization.id_token })}""")

c = c.replace("""className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer h-auto\"""", """className="flex items-center justify-center space-x-2 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer w-full" style={{ height: 40 }}\"""")

with open("src/pages/auth/SocialLoginButtons.tsx", "w") as f:
    f.write(c)

