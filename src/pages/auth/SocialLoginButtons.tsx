import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import AppleSignin from "react-apple-signin-auth";
import { Button } from "../../components/ui/Button";
import { useSocialLogin } from "./useAuth";
import { authActions } from "../../stores/auth-store";
import { useNavigate } from "@tanstack/react-router";

interface SocialLoginButtonsProps {
  showNotice: (type: "success" | "error", message: string) => void;
}

const InnerButtons = ({ showNotice }: SocialLoginButtonsProps) => {
  const socialLoginMutation = useSocialLogin();
  const navigate = useNavigate();

  const handleSocialSuccess = async (provider: string, data: { idToken?: string, accessToken?: string }) => {
    try {
      const response = await socialLoginMutation.mutateAsync({ provider, ...data });
      
      authActions.refresh({
        token: response.token || (response as any).data?.token,
        refreshToken: response.refreshToken || (response as any).data?.refreshToken || "",
      });
      showNotice("success", `Successfully authenticated via ${provider}.`);
      setTimeout(() => {
        navigate({ to: "/app" });
      }, 1000);
    } catch (error: any) {
      showNotice("error", error.response?.data?.message || `Authentication via ${provider} failed.`);
    }
  };



  return (
    <div className="space-y-6 mt-6">
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-[#c4c7c7]"></div>
        <span className="flex-shrink mx-4 font-sans font-bold text-[10px] uppercase tracking-widest text-[#444748]">
          Or Continue Via
        </span>
        <div className="flex-grow border-t border-[#c4c7c7]"></div>
      </div>
            <div className="grid grid-cols-1 gap-4">
        {/* Google */}
        <div className="relative w-full h-[52px] group overflow-hidden">
          <Button
            variant="outline"
            type="button"
            className="absolute inset-0 w-full h-full flex items-center justify-center space-x-2 border-4 border-black bg-white group-hover:bg-[#eeeeee] transition-colors cursor-pointer pointer-events-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Google</span>
          </Button>
          <div className="absolute inset-0 opacity-0 z-10 w-full h-full [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full flex items-center justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  handleSocialSuccess('google', { idToken: credentialResponse.credential });
                }
              }}
              onError={() => showNotice("error", "Google login failed")}
            />
          </div>
        </div>

        {/* Facebook */}
        <FacebookLogin
          appId={(import.meta as any).env.VITE_FACEBOOK_APP_ID || "dummy_facebook_app_id"}
          onSuccess={(response) => {
            if (response.accessToken) {
              handleSocialSuccess('facebook', { accessToken: response.accessToken });
            } else {
              showNotice("error", "Facebook login failed");
            }
          }}
          onFail={() => showNotice("error", "Facebook login failed")}
          render={({ onClick }) => (
            <Button
              variant="outline"
              type="button"
              onClick={onClick}
              className="w-full h-[52px] flex items-center justify-center space-x-2 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Facebook</span>
            </Button>
          )}
        />

        {/* Apple */}
        <AppleSignin
          authOptions={{
            clientId: (import.meta as any).env.VITE_APPLE_CLIENT_ID || 'dummy.apple.client.id',
            scope: 'email name',
            redirectURI: (import.meta as any).env.VITE_APPLE_REDIRECT_URI || 'https://dummy.redirect.uri',
            state: 'state',
            nonce: 'nonce',
            usePopup: true
          }}
          uiType="dark"
          onSuccess={(response: any) => handleSocialSuccess('apple', { idToken: response.authorization.id_token })}
          onError={(error: any) => showNotice("error", "Apple login failed")}
          render={(props: any) => (
            <Button
              variant="outline"
              type="button"
              onClick={props.onClick}
              className="w-full h-[52px] flex items-center justify-center space-x-2 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.53-.67-2.87-.67-1.36 0-1.81.65-2.87.65-1.14 0-2.28-.74-3.31-1.74C2.68 18.03 1 14.58 1 11.55c0-3.11 2.02-4.75 3.96-4.75 1.03 0 1.85.39 2.53.39.65 0 1.3-.42 2.53-.42 1.88 0 3.41 1.01 4.28 2.27-3.63 1.51-3.04 6.01.55 7.24-.71 1.61-1.61 3.21-2.8 4zm-3.13-15.4c0-2.27 1.88-4.11 4.18-4.11.28 0 .55.02.82.07-.11 2.34-2.04 4.18-4.25 4.18-.3 0-.57-.02-.75-.14z"></path>
              </svg>
              <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Apple</span>
            </Button>
          )}
        />
      </div>
    </div>
  );
};

export const SocialLoginButtons = ({ showNotice }: SocialLoginButtonsProps) => {
  return (
    <GoogleOAuthProvider clientId={(import.meta as any).env.VITE_GOOGLE_CLIENT_ID || "dummy_google_client_id.apps.googleusercontent.com"}>
      <InnerButtons showNotice={showNotice} />
    </GoogleOAuthProvider>
  );
};
