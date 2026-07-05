import React from "react";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "./useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Checkbox";

interface RegisterFormProps {
  onSubmit: (values: any) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
      registerForm.reset();
    },
  });

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); registerForm.handleSubmit(); }}>
      <registerForm.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <label className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]" htmlFor={field.name}>
              Email Address
            </label>
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
            {field.state.meta.errors ? <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.join(", ")}</p> : null}
          </div>
        )}
      />
      <registerForm.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <label className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]" htmlFor={field.name}>
              Password
            </label>
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
            {field.state.meta.errors ? <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.join(", ")}</p> : null}
          </div>
        )}
      />
      <registerForm.Field
        name="confirmPassword"
        children={(field) => (
          <div className="space-y-2">
            <label className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]" htmlFor={field.name}>
              Confirm Password
            </label>
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
            {field.state.meta.errors ? <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.join(", ")}</p> : null}
          </div>
        )}
      />
      
      <registerForm.Field
        name="remember"
        children={(field) => (
          <div className="flex flex-col space-y-1 py-2">
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked as boolean)}
                />
              </div>
              <label className="font-sans font-medium text-[12px] text-[#444748]" htmlFor={field.name}>
                I agree to the{" "}
                <a className="underline font-sans font-bold text-black cursor-pointer" onClick={(e) => e.preventDefault()}>Terms of Publication</a>{" "}
                and{" "}
                <a className="underline font-sans font-bold text-black cursor-pointer" onClick={(e) => e.preventDefault()}>Scholarly Conduct</a>.
              </label>
            </div>
            {field.state.meta.errors ? <p className="text-red-500 text-xs ml-8">{field.state.meta.errors.join(", ")}</p> : null}
          </div>
        )}
      />

      <registerForm.Subscribe
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
              <span>Establish Scholarship</span>
            )}
          </Button>
        )}
      />
    </form>
  );
}
