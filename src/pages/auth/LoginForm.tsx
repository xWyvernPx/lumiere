import React from "react";
import { useForm } from "@tanstack/react-form";
import { loginSchema, useForgotPassword } from "./useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Label } from "../../components/ui/Label";

interface LoginFormProps {
  onSubmit: (values: any) => Promise<void>;
  showNotice: (type: "success" | "error", message: string) => void;
}

export function LoginForm({ onSubmit, showNotice }: LoginFormProps) {
  const forgotPasswordMutation = useForgotPassword();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = loginForm.state.values.email;
    if (!email) {
      showNotice("error", "Please enter your email address first to reset password.");
      return;
    }
    try {
      await forgotPasswordMutation.mutateAsync({ email });
      showNotice("success", "Password reset instructions have been forwarded to your email inbox.");
    } catch (error: any) {
      showNotice("error", error.response?.data?.message || "Failed to send reset instructions.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); loginForm.handleSubmit(); }}>
      <loginForm.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <Label className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]" htmlFor={field.name}>
              Email Address
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="scholar@lumiere.edu"
              type="email"
              required
            />
            {field.state.meta.errors ? <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.map((e: any) => e.message || e).join(", ")}</p> : null}
          </div>
        )}
      />
      <loginForm.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]" htmlFor={field.name}>
                Password
              </Label>
              <a
                className="font-sans font-bold text-[10px] text-[#3d627b] uppercase tracking-[0.1em] hover:underline cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forgot?
              </a>
            </div>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
            {field.state.meta.errors ? <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.map((e: any) => e.message || e).join(", ")}</p> : null}
          </div>
        )}
      />

      <loginForm.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            className="w-full py-4 text-sm uppercase tracking-widest flex items-center justify-center space-x-2 border-4 border-black font-bold h-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Begin Session</span>
            )}
          </Button>
        )}
      />
    </form>
  );
}
